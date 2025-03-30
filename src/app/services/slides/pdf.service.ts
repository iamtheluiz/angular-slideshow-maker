import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { domToJpeg } from 'modern-screenshot'

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() { }

  async generatePdf(name = "slide") {
    const slides = document.querySelectorAll('app-slide');

    const pdf = new jsPDF('landscape', 'mm', [297, 167]);

    let pageCounter = 0;

    for (const slide of slides) {
      pageCounter += 1;

      const img = await domToJpeg(slide, {
        backgroundColor: "white"
      });

      pdf.addImage(img, 'JPEG', 0, 0, 297, 167);

      if (pageCounter < slides.length) {
        pdf.addPage();
      }
    }

    const filename = name.replace(/[^a-zA-Z0-9 ]/g, '');

    pdf.save(filename);
  }
}
