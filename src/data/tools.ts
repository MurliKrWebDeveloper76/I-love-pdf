import {
  FileText,
  Scissors,
  Minimize2,
  FileType,
  Presentation,
  Sheet,
  Image,
  PenTool,
  Lock,
  Unlock,
  RotateCw,
  Globe,
  Trash2,
  Files,
  Stamp,
  ScanLine,
  Languages,
  Crop,
  Shield,
  FileCheck,
  ArrowRightLeft,
  Layers
} from "lucide-react";

export type ToolCategory = "All" | "Workflows" | "Organize PDF" | "Optimize PDF" | "Convert PDF" | "Edit PDF" | "PDF Security" | "PDF Intelligence";

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: any;
  category: ToolCategory[];
  isNew?: boolean;
}

export const tools: Tool[] = [
  {
    id: "merge-pdf",
    title: "Merge PDF",
    description: "Combine PDFs in the order you want with the easiest PDF merger available.",
    icon: Files,
    category: ["All", "Organize PDF"]
  },
  {
    id: "split-pdf",
    title: "Split PDF",
    description: "Separate one page or a whole set for easy conversion into independent PDF files.",
    icon: Scissors,
    category: ["All", "Organize PDF"]
  },
  {
    id: "compress-pdf",
    title: "Compress PDF",
    description: "Reduce file size while optimizing for maximal PDF quality.",
    icon: Minimize2,
    category: ["All", "Optimize PDF"]
  },
  {
    id: "pdf-to-word",
    title: "PDF to Word",
    description: "Easily convert your PDF files into easy to edit DOC and DOCX documents.",
    icon: FileText,
    category: ["All", "Convert PDF"]
  },
  {
    id: "pdf-to-powerpoint",
    title: "PDF to PowerPoint",
    description: "Turn your PDF files into easy to edit PPT and PPTX slideshows.",
    icon: Presentation,
    category: ["All", "Convert PDF"]
  },
  {
    id: "pdf-to-excel",
    title: "PDF to Excel",
    description: "Pull data straight from PDFs into Excel spreadsheets in a few short seconds.",
    icon: Sheet,
    category: ["All", "Convert PDF"]
  },
  {
    id: "word-to-pdf",
    title: "Word to PDF",
    description: "Make DOC and DOCX files easy to read by converting them to PDF.",
    icon: FileText,
    category: ["All", "Convert PDF"]
  },
  {
    id: "powerpoint-to-pdf",
    title: "PowerPoint to PDF",
    description: "Make PPT and PPTX slideshows easy to view by converting them to PDF.",
    icon: Presentation,
    category: ["All", "Convert PDF"]
  },
  {
    id: "excel-to-pdf",
    title: "Excel to PDF",
    description: "Make EXCEL spreadsheets easy to read by converting them to PDF.",
    icon: Sheet,
    category: ["All", "Convert PDF"]
  },
  {
    id: "edit-pdf",
    title: "Edit PDF",
    description: "Add text, images, shapes or freehand annotations to a PDF document.",
    icon: PenTool,
    category: ["All", "Edit PDF"]
  },
  {
    id: "pdf-to-jpg",
    title: "PDF to JPG",
    description: "Convert each PDF page into a JPG or extract all images contained in a PDF.",
    icon: Image,
    category: ["All", "Convert PDF"]
  },
  {
    id: "jpg-to-pdf",
    title: "JPG to PDF",
    description: "Convert JPG images to PDF in seconds. Easily adjust orientation and margins.",
    icon: Image,
    category: ["All", "Convert PDF"]
  },
  {
    id: "sign-pdf",
    title: "Sign PDF",
    description: "Sign yourself or request electronic signatures from others.",
    icon: PenTool,
    category: ["All", "Edit PDF", "PDF Security"]
  },
  {
    id: "watermark",
    title: "Watermark",
    description: "Stamp an image or text over your PDF in seconds.",
    icon: Stamp,
    category: ["All", "Edit PDF"]
  },
  {
    id: "rotate-pdf",
    title: "Rotate PDF",
    description: "Rotate your PDFs the way you need them. Rotate multiple PDFs at once.",
    icon: RotateCw,
    category: ["All", "Organize PDF"]
  },
  {
    id: "html-to-pdf",
    title: "HTML to PDF",
    description: "Convert webpages in HTML to PDF by pasting a URL.",
    icon: Globe,
    category: ["All", "Convert PDF"]
  },
  {
    id: "unlock-pdf",
    title: "Unlock PDF",
    description: "Remove PDF password security.",
    icon: Unlock,
    category: ["All", "PDF Security"]
  },
  {
    id: "protect-pdf",
    title: "Protect PDF",
    description: "Protect PDF files with password encryption.",
    icon: Lock,
    category: ["All", "PDF Security"]
  },
  {
    id: "organize-pdf",
    title: "Organize PDF",
    description: "Sort pages, delete, rearrange, or add pages.",
    icon: Layers,
    category: ["All", "Organize PDF"]
  },
  {
    id: "pdf-to-pdfa",
    title: "PDF to PDF/A",
    description: "Transform your PDF to ISO-standard PDF/A format.",
    icon: FileType,
    category: ["All", "Convert PDF"]
  },
  {
    id: "repair-pdf",
    title: "Repair PDF",
    description: "Repair damaged or corrupt PDF files.",
    icon: FileCheck,
    category: ["All", "Optimize PDF"]
  },
  {
    id: "page-numbers",
    title: "Page Numbers",
    description: "Add page numbers into PDFs easily.",
    icon: Files,
    category: ["All", "Edit PDF"]
  },
  {
    id: "scan-to-pdf",
    title: "Scan to PDF",
    description: "Capture document scans from mobile device and upload.",
    icon: ScanLine,
    category: ["All", "Convert PDF"]
  },
  {
    id: "ocr-pdf",
    title: "OCR PDF",
    description: "Convert scanned PDF into searchable text.",
    icon: ScanLine,
    category: ["All", "Convert PDF", "PDF Intelligence"]
  },
  {
    id: "compare-pdf",
    title: "Compare PDF",
    description: "Side-by-side comparison tool.",
    icon: ArrowRightLeft,
    category: ["All", "PDF Intelligence"]
  },
  {
    id: "redact-pdf",
    title: "Redact PDF",
    description: "Permanently remove sensitive information.",
    icon: Shield,
    category: ["All", "PDF Security"]
  },
  {
    id: "crop-pdf",
    title: "Crop PDF",
    description: "Crop margins or specific areas.",
    icon: Crop,
    category: ["All", "Edit PDF"]
  },
  {
    id: "translate-pdf",
    title: "Translate PDF",
    description: "AI powered translation preserving layout.",
    icon: Languages,
    category: ["All", "PDF Intelligence"]
  }
];
