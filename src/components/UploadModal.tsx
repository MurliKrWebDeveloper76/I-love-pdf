import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, File, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { API_URL } from '@/config';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName: string;
}

export function UploadModal({ isOpen, onClose, toolName }: UploadModalProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const [cropOption, setCropOption] = useState<string>('auto');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    
    // Filter files based on tool type
    const isImageTool = toolName.includes('JPG') || toolName.includes('Image');
    const validFiles = droppedFiles.filter(file => {
      if (isImageTool) {
        return file.type.startsWith('image/') || file.type === 'application/pdf';
      }
      return file.type === 'application/pdf';
    });

    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
      toast.success(`${validFiles.length} file(s) added!`);
    } else {
      toast.error(isImageTool ? 'Please upload image or PDF files.' : 'Please upload PDF files.');
    }
  }, [toolName]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      setFiles(prev => [...prev, ...selectedFiles]);
      toast.success(`${selectedFiles.length} file(s) added!`);
    }
  }, []);

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleProcess = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    const formData = new FormData();
    files.forEach(file => {
      formData.append('file', file);
    });
    
    if (toolName === 'Compress PDF') {
      formData.append('level', compressionLevel);
    }
    
    if (toolName === 'Crop PDF') {
      formData.append('mode', cropOption);
    }

    // Map tool names to API endpoints
    const toolEndpointMap: Record<string, string> = {
      'Merge PDF': 'merge',
      'Split PDF': 'split',
      'Compress PDF': 'compress',
      'PDF to Word': 'pdf-to-word',
      'PDF to PowerPoint': 'pdf-to-powerpoint',
      'PDF to Excel': 'pdf-to-excel',
      'Word to PDF': 'word-to-pdf',
      'PowerPoint to PDF': 'powerpoint-to-pdf',
      'Excel to PDF': 'excel-to-pdf',
      'Edit PDF': 'edit-pdf',
      'PDF to JPG': 'pdf-to-jpg',
      'JPG to PDF': 'jpg-to-pdf',
      'Sign PDF': 'sign-pdf',
      'Watermark': 'watermark',
      'Rotate PDF': 'rotate-pdf',
      'HTML to PDF': 'html-to-pdf',
      'Unlock PDF': 'unlock-pdf',
      'Protect PDF': 'protect-pdf',
      'Organize PDF': 'organize-pdf',
      'PDF to PDF/A': 'pdf-to-pdfa',
      'Repair PDF': 'repair-pdf',
      'Page Numbers': 'page-numbers',
      'Scan to PDF': 'scan-to-pdf',
      'OCR PDF': 'ocr-pdf',
      'Compare PDF': 'compare-pdf',
      'Redact PDF': 'redact-pdf',
      'Crop PDF': 'crop-pdf',
      'Translate PDF': 'translate-pdf',
    };

    const endpoint = toolEndpointMap[toolName] || 'process';
    const url = `${API_URL}/api/tools/${endpoint}`;
    
    console.log(`Processing ${toolName} at ${url}`);

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = 'Processing failed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If response is not JSON (e.g. HTML error page from proxy/server crash), use status text
          console.error('Non-JSON error response:', await response.text());
          errorMessage = `Server Error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Handle file download
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${toolName.toLowerCase().replace(/\s+/g, '-')}-result.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);

      toast.success(`${toolName} completed successfully!`);
      setTimeout(onClose, 1500);
    } catch (error: any) {
      console.error('Processing error:', error);
      toast.error(error.message || 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h3 className="text-2xl font-bold text-dark">{toolName}</h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 md:p-12">
              {files.length === 0 ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={cn(
                    "border-3 border-dashed rounded-3xl p-10 text-center transition-all duration-300 flex flex-col items-center justify-center min-h-[300px] cursor-pointer group",
                    isDragging 
                      ? "border-primary bg-primary/5 scale-[1.02]" 
                      : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                  )}
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <input 
                    type="file" 
                    id="file-upload" 
                    className="hidden" 
                    accept={toolName.includes('JPG') ? "image/*,.pdf" : ".pdf"}
                    multiple
                    onChange={handleFileInput}
                  />
                  <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                    <Upload className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-bold text-dark mb-2">Select files</h4>
                  <p className="text-gray-500 text-lg">or drop files here</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[300px]">
                  {isProcessing ? (
                    <div className="text-center">
                      <div className="w-20 h-20 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto mb-6" />
                      <h4 className="text-xl font-bold text-dark mb-2">Processing...</h4>
                      <p className="text-gray-500">Please wait while we process your files</p>
                    </div>
                  ) : (
                    <div className="text-center w-full max-w-md">
                      <div className="bg-gray-50 rounded-2xl p-4 mb-6 max-h-[200px] overflow-y-auto">
                        {files.map((f, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white rounded-xl mb-2 last:mb-0 shadow-sm">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <div className="bg-green-50 text-green-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                                <File className="w-5 h-5" />
                              </div>
                              <div className="text-left overflow-hidden">
                                <p className="font-medium text-dark truncate text-sm">{f.name}</p>
                                <p className="text-xs text-gray-400">{(f.size / 1024 / 1024).toFixed(2)} MB</p>
                              </div>
                            </div>
                            <button 
                              onClick={() => removeFile(index)}
                              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => document.getElementById('add-more-files')?.click()}
                          className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all mt-2 text-sm font-medium"
                        >
                          + Add more files
                        </button>
                        <input 
                          type="file" 
                          id="add-more-files" 
                          className="hidden" 
                          accept={toolName.includes('JPG') ? "image/*,.pdf" : ".pdf"}
                          multiple
                          onChange={handleFileInput}
                        />
                      </div>
                      
                      <button 
                        onClick={handleProcess}
                        className="w-full bg-primary text-white text-xl font-bold py-4 rounded-xl hover:bg-primary-hover transition-colors shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
                      >
                        {toolName} <CheckCircle2 className="w-6 h-6" />
                      </button>
                      
                      <button 
                        onClick={() => setFiles([])}
                        className="mt-4 text-gray-400 hover:text-dark font-medium transition-colors"
                      >
                        Remove all files
                      </button>
                    </div>
                  )}

                  {toolName === 'Compress PDF' && !isProcessing && files.length > 0 && (
                    <div className="mt-6 w-full max-w-md bg-gray-50 p-4 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Compression Level</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          onClick={() => setCompressionLevel('screen')}
                          className={cn(
                            "px-3 py-2 text-sm rounded-lg border transition-all",
                            compressionLevel === 'screen' 
                              ? "bg-primary text-white border-primary" 
                              : "bg-white text-gray-600 border-gray-200 hover:border-primary/50"
                          )}
                        >
                          Extreme
                          <span className="block text-[10px] opacity-80">Low Quality</span>
                        </button>
                        <button
                          onClick={() => setCompressionLevel('ebook')}
                          className={cn(
                            "px-3 py-2 text-sm rounded-lg border transition-all",
                            compressionLevel === 'ebook' 
                              ? "bg-primary text-white border-primary" 
                              : "bg-white text-gray-600 border-gray-200 hover:border-primary/50"
                          )}
                        >
                          Recommended
                          <span className="block text-[10px] opacity-80">Good Quality</span>
                        </button>
                        <button
                          onClick={() => setCompressionLevel('printer')}
                          className={cn(
                            "px-3 py-2 text-sm rounded-lg border transition-all",
                            compressionLevel === 'printer' 
                              ? "bg-primary text-white border-primary" 
                              : "bg-white text-gray-600 border-gray-200 hover:border-primary/50"
                          )}
                        >
                          High
                          <span className="block text-[10px] opacity-80">Best Quality</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {toolName === 'Crop PDF' && !isProcessing && files.length > 0 && (
                    <div className="mt-6 w-full max-w-md bg-gray-50 p-4 rounded-xl">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Crop Mode</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setCropOption('auto')}
                          className={cn(
                            "px-3 py-2 text-sm rounded-lg border transition-all",
                            cropOption === 'auto' 
                              ? "bg-primary text-white border-primary" 
                              : "bg-white text-gray-600 border-gray-200 hover:border-primary/50"
                          )}
                        >
                          Auto Crop
                          <span className="block text-[10px] opacity-80">Remove Margins</span>
                        </button>
                        <button
                          onClick={() => setCropOption('center')}
                          className={cn(
                            "px-3 py-2 text-sm rounded-lg border transition-all",
                            cropOption === 'center' 
                              ? "bg-primary text-white border-primary" 
                              : "bg-white text-gray-600 border-gray-200 hover:border-primary/50"
                          )}
                        >
                          Center Crop
                          <span className="block text-[10px] opacity-80">Focus Content</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
