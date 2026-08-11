import { PDFParse } from 'pdf-parse';

export const extractTextFromPDF = async (buffer: Buffer): Promise<string> => {
  try {
    const parser = new PDFParse({ data: buffer });
    const data = await parser.getText();
    
    if (!data.text || data.text.trim().length === 0) {
      throw new Error('No text could be extracted from the PDF');
    }

    // Normalize excessive whitespace while preserving structure
    const normalizedText = data.text
      .replace(/\r\n/g, '\n') // Normalize newlines
      .replace(/\n{3,}/g, '\n\n') // Reduce multiple newlines to max 2
      .replace(/[ \t]+/g, ' ') // Reduce multiple spaces/tabs to 1
      .trim();

    return normalizedText;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to extract text from PDF: ${errorMessage}`);
  }
};
