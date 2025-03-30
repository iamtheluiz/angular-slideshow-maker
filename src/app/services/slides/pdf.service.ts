import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() { }

  async generatePdf() {
    const slides = document.querySelectorAll('app-slide');

    const pdf = new jsPDF('landscape', 'mm', [297, 167]);

    let pageCounter = 0;

    for (const slide of slides) {
      pageCounter += 1;

      const canvas = await html2canvas(slide as HTMLElement, {
        scale: 2,
        allowTaint: true
      });
      const img = canvas.toDataURL('image/jpeg');

      pdf.addImage(img, 'JPEG', 0, 0, 297, 167);

      if (pageCounter < slides.length) {
        pdf.addPage();
      }
    }

    pdf.save('slides.pdf');
  }
}
