import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';

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
    // Allow single file for testing, though merge usually requires 2+
    if (!files || files.length === 0) {
      cleanupFiles(files || []);
      return res.status(400).json({ error: 'Please upload at least 1 PDF file' });
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const pdfBytes = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(pdfBytes);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();
    
    // Cleanup input files
    cleanupFiles(files);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=merged.pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('Merge error:', error);
    res.status(500).json({ error: 'Failed to merge PDFs' });
  }
});

// Split PDF
router.post('/split', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Please upload a PDF file' });
    }

    // For simplicity, we'll just return the first page as a split example
    // In a real app, we'd accept page ranges
    const pdfBytes = fs.readFileSync(file.path);
    const pdf = await PDFDocument.load(pdfBytes);
    const newPdf = await PDFDocument.create();
    const [firstPage] = await newPdf.copyPages(pdf, [0]);
    newPdf.addPage(firstPage);

    const newPdfBytes = await newPdf.save();
    
    cleanupFiles([file]);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=split.pdf');
    res.send(Buffer.from(newPdfBytes));
  } catch (error) {
    console.error('Split error:', error);
    res.status(500).json({ error: 'Failed to split PDF' });
  }
});

// Compress PDF (Mock implementation as pdf-lib doesn't support compression well)
router.post('/compress', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'Please upload a PDF file' });
    }

    // Just return the original file for now, simulating compression
    // Real compression requires Ghostscript or similar tools
    const pdfBytes = fs.readFileSync(file.path);
    
    cleanupFiles([file]);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=compressed.pdf');
    res.send(pdfBytes);
  } catch (error) {
    console.error('Compress error:', error);
    res.status(500).json({ error: 'Failed to compress PDF' });
  }
});

// Generic handler for other tools (Mock)
router.post('/:tool', upload.array('file'), async (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'Please upload at least one file' });
    }

    // Just return the first file back for now to simulate processing
    // In a real app, we would process all files and return a zip if multiple
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
