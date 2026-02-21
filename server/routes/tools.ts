import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PDFDocument, degrees, rgb, StandardFonts } from 'pdf-lib';
import archiver from 'archiver';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Helper to cleanup files
const cleanupFiles = (files: Express.Multer.File[]) => {
  files.forEach(file => {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  });
};

// Merge PDF
router.post('/merge', upload.array('file'), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Please upload at least one PDF file' });
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    cleanupFiles(files);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=merged.pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Merge error:', error);
    res.status(500).json({ error: 'Failed to merge PDFs' });
  }
});

// Split PDF (Splits all pages into a ZIP)
router.post('/split', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Please upload a PDF file' });
    }

    const pdfBytes = fs.readFileSync(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const pageCount = pdf.getPageCount();

    // Create a zip stream
    const archive = archiver('zip', { zlib: { level: 9 } });
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=split-pages.zip');
    
    archive.pipe(res);

    for (let i = 0; i < pageCount; i++) {
      const newPdf = await PDFDocument.create();
      const [page] = await newPdf.copyPages(pdf, [i]);
      newPdf.addPage(page);
      const newPdfBytes = await newPdf.save();
      archive.append(Buffer.from(newPdfBytes), { name: `page-${i + 1}.pdf` });
    }

    await archive.finalize();
    cleanupFiles([file]);
  } catch (error) {
    console.error('Split error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to split PDF' });
    }
  }
});

// JPG to PDF
router.post('/jpg-to-pdf', upload.array('file'), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Please upload image files' });
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
      const imgBytes = fs.readFileSync(file.path);
      let img;
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        img = await pdfDoc.embedJpg(imgBytes);
      } else if (file.mimetype === 'image/png') {
        img = await pdfDoc.embedPng(imgBytes);
      } else {
        continue; // Skip unsupported formats
      }

      const page = pdfDoc.addPage([img.width, img.height]);
      page.drawImage(img, {
        x: 0,
        y: 0,
        width: img.width,
        height: img.height,
      });
    }

    const pdfBytes = await pdfDoc.save();
    cleanupFiles(files);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=images.pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('JPG to PDF error:', error);
    res.status(500).json({ error: 'Failed to convert images to PDF' });
  }
});

// Rotate PDF (Rotates all pages 90 degrees clockwise)
router.post('/rotate-pdf', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Please upload a PDF file' });
    }

    const pdfBytes = fs.readFileSync(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const pages = pdf.getPages();
    
    pages.forEach(page => {
      const currentRotation = page.getRotation().angle;
      page.setRotation(degrees(currentRotation + 90));
    });

    const newPdfBytes = await pdf.save();
    cleanupFiles([file]);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=rotated.pdf');
    res.send(Buffer.from(newPdfBytes));
  } catch (error) {
    console.error('Rotate error:', error);
    res.status(500).json({ error: 'Failed to rotate PDF' });
  }
});

// Watermark PDF
router.post('/watermark', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Please upload a PDF file' });
    }

    const pdfBytes = fs.readFileSync(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const pages = pdf.getPages();
    const font = await pdf.embedFont(StandardFonts.HelveticaBold);

    pages.forEach(page => {
      const { width, height } = page.getSize();
      page.drawText('CONFIDENTIAL', {
        x: width / 2 - 100,
        y: height / 2,
        size: 50,
        font: font,
        color: rgb(0.95, 0.1, 0.1),
        opacity: 0.3,
        rotate: degrees(45),
      });
    });

    const newPdfBytes = await pdf.save();
    cleanupFiles([file]);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=watermarked.pdf');
    res.send(Buffer.from(newPdfBytes));
  } catch (error) {
    console.error('Watermark error:', error);
    res.status(500).json({ error: 'Failed to watermark PDF' });
  }
});

// Protect PDF (Adds default password '123456')
router.post('/protect-pdf', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Please upload a PDF file' });
    }

    const pdfBytes = fs.readFileSync(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    
    // Encrypt with default password for demo
    pdf.encrypt({
      userPassword: '1234',
      ownerPassword: 'owner1234',
      permissions: {
        printing: 'highResolution',
        modifying: false,
        copying: false,
        annotating: false,
        fillingForms: false,
        contentAccessibility: false,
        documentAssembly: false,
      },
    });

    const newPdfBytes = await pdf.save();
    cleanupFiles([file]);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=protected.pdf');
    res.send(Buffer.from(newPdfBytes));
  } catch (error) {
    console.error('Protect error:', error);
    res.status(500).json({ error: 'Failed to protect PDF' });
  }
});

// Organize PDF (Reorder/Delete pages)
router.post('/organize-pdf', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Please upload a PDF file' });

    // Mock implementation: just return the file for now
    // In real app: accept page order/deletion instructions
    const pdfBytes = fs.readFileSync(file.path);
    cleanupFiles([file]);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=organized.pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Organize error:', error);
    res.status(500).json({ error: 'Failed to organize PDF' });
  }
});

// Page Numbers
router.post('/page-numbers', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Please upload a PDF file' });

    const pdfBytes = fs.readFileSync(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const pages = pdf.getPages();
    const font = await pdf.embedFont(StandardFonts.Helvetica);

    pages.forEach((page, idx) => {
      const { width } = page.getSize();
      page.drawText(`${idx + 1}`, {
        x: width / 2,
        y: 20,
        size: 12,
        font: font,
        color: rgb(0, 0, 0),
      });
    });

    const newPdfBytes = await pdf.save();
    cleanupFiles([file]);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=page-numbers.pdf');
    res.send(Buffer.from(newPdfBytes));
  } catch (error) {
    console.error('Page numbers error:', error);
    res.status(500).json({ error: 'Failed to add page numbers' });
  }
});

// Crop PDF (Mock - crops to center)
router.post('/crop-pdf', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Please upload a PDF file' });

    const pdfBytes = fs.readFileSync(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const pages = pdf.getPages();

    pages.forEach(page => {
      const { width, height } = page.getSize();
      // Crop 10% from each side
      page.setCropBox(width * 0.1, height * 0.1, width * 0.8, height * 0.8);
    });

    const newPdfBytes = await pdf.save();
    cleanupFiles([file]);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=cropped.pdf');
    res.send(Buffer.from(newPdfBytes));
  } catch (error) {
    console.error('Crop error:', error);
    res.status(500).json({ error: 'Failed to crop PDF' });
  }
});

// PDF to JPG (Real implementation using pdftoppm)
router.post('/pdf-to-jpg', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: 'Please upload a PDF file' });

    const outputDir = path.join(path.dirname(file.path), `pdf-to-jpg-${Date.now()}`);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    try {
      // Use pdftoppm (from poppler-utils)
      // pdftoppm -jpeg -r 150 input.pdf output_prefix
      const outputPrefix = path.join(outputDir, 'page');
      const command = `pdftoppm -jpeg -r 150 "${file.path}" "${outputPrefix}"`;
      
      await execPromise(command);

      const archive = archiver('zip', { zlib: { level: 9 } });
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename=images.zip');
      
      archive.pipe(res);
      archive.directory(outputDir, false);
      await archive.finalize();

      // Cleanup happens after response is finished usually, but for simplicity:
      // We rely on OS/container cleanup or implement a scheduled cleanup
      // Here we just cleanup the input file immediately
      cleanupFiles([file]);
      
      // Clean output dir after a delay to allow streaming
      setTimeout(() => {
        if (fs.existsSync(outputDir)) {
          fs.rmSync(outputDir, { recursive: true, force: true });
        }
      }, 5000);

    } catch (execError) {
      console.error('Poppler error:', execError);
      // Fallback: return original PDF in a zip
      const archive = archiver('zip', { zlib: { level: 9 } });
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', 'attachment; filename=images-fallback.zip');
      archive.pipe(res);
      archive.append(fs.createReadStream(file.path), { name: 'original.pdf' });
      await archive.finalize();
      cleanupFiles([file]);
      if (fs.existsSync(outputDir)) fs.rmdirSync(outputDir);
    }
  } catch (error) {
    console.error('PDF to JPG error:', error);
    res.status(500).json({ error: 'Failed to convert PDF to JPG' });
  }
});

// Placeholders for other tools
const placeholderTools = [
  'pdf-to-word', 'pdf-to-powerpoint', 'pdf-to-excel',
  'word-to-pdf', 'powerpoint-to-pdf', 'excel-to-pdf',
  'edit-pdf', 'sign-pdf', 'html-to-pdf',
  'unlock-pdf', 'pdf-to-pdfa', 'repair-pdf', 'scan-to-pdf',
  'ocr-pdf', 'compare-pdf', 'redact-pdf', 'translate-pdf'
];

placeholderTools.forEach(tool => {
  router.post(`/${tool}`, upload.array('file'), async (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'Please upload at least one file' });
      }
      
      // Return first file as mock response
      const pdfBytes = fs.readFileSync(files[0].path);
      cleanupFiles(files);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${tool}-result.pdf`);
      res.send(Buffer.from(pdfBytes));
    } catch (error) {
      console.error(`${tool} error:`, error);
      res.status(500).json({ error: `Failed to process ${tool}` });
    }
  });
});

// Generic handler for any other tools
router.post('/:tool', upload.array('file'), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Please upload at least one file' });
    }

    // Just return the first file back for now to simulate processing
    const pdfBytes = fs.readFileSync(files[0].path);
    cleanupFiles(files);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=processed.pdf`);
    res.send(pdfBytes);
  } catch (error) {
    console.error('Tool error:', error);
    res.status(500).json({ error: 'Failed to process PDF' });
  }
});

export default router;
