(function () {
  const sections = Array.isArray(window.form_sections) ? window.form_sections : [];
  const root = document.getElementById('sections-root');
  const form = document.getElementById('abnahme-form');
  const out = document.getElementById('submitted');

  // ---------- Hilfen ----------
  const el = (tag, cls) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  };

  const addLabelInput = (wrap, label, name, type = 'text', preset) => {
    const row = el('div', 'form-group');
    const l = el('label');
    l.textContent = label;
    row.appendChild(l);

    let input;
    if (type === 'textarea') {
      input = document.createElement('textarea');
    } else if (type === 'checkbox') {
      input = document.createElement('input');
      input.type = 'checkbox';
      if (preset === true) input.checked = true;
      input.style.width = 'auto';
    } else {
      input = document.createElement('input');
      input.type = type || 'text';
    }
    input.name = name;
    row.appendChild(input);
    wrap.appendChild(row);
  };

  const makeAddFieldUI = (section, idx) => {
    if (!section.options) return null;

    const wrap = el('div', 'field-selector');
    const sel = document.createElement('select');
    sel.id = `select-${idx}`;
    sel.dataset.sectionTitle = section.title || '';

    const def = document.createElement('option');
    def.value = '';
    def.textContent = '-- Feld auswählen --';
    sel.appendChild(def);

    section.options.forEach(o => {
      const opt = document.createElement('option');
      opt.value = o.name;
      opt.textContent = o.label;
      opt.dataset.type = o.type || 'text';
      if (o.subfields) {
        opt.dataset.subfields = JSON.stringify(o.subfields);
      }
      sel.appendChild(opt);
    });

    const addBtn = el('button', 'add-btn');
    addBtn.type = 'button';
    addBtn.textContent = '+';
    addBtn.dataset.section = String(idx);

    wrap.appendChild(sel);
    wrap.appendChild(addBtn);

    return { ui: wrap, select: sel, addBtn };
  };

  // ---------- Rendering ----------
  sections.forEach((section, i) => {
    const h2 = document.createElement('h2');
    h2.textContent = section.title || '';
    root.appendChild(h2);

    // Feste Felder
    if (Array.isArray(section.fields)) {
      section.fields.forEach(f =>
        addLabelInput(root, f.label, f.name, f.type, f.checked)
      );
    }

    // Dynamische Optionen
    if (Array.isArray(section.options) && section.options.length) {
      const { ui, select, addBtn } = makeAddFieldUI(section, i) || {};
      const container = el('div');
      container.id = `fields-container-${i}`;

      if (ui) root.appendChild(ui);
      root.appendChild(container);

      if (addBtn) {
        addBtn.addEventListener('click', () => {
          const optEl = select.selectedOptions[0];
          if (!optEl || !optEl.value) return;

          const sectionTitle = (select.dataset.sectionTitle || '').trim();
          const type = optEl.dataset.type;
          const label = optEl.textContent;
          const subfields = optEl.dataset.subfields ? JSON.parse(optEl.dataset.subfields) : [];

          // --- Spezial: Weitere Räume ---
          if (sectionTitle === 'Weitere Räume') {
            const card = el('div', 'field-item');
            card.style.flexDirection = 'column';
            card.style.alignItems = 'stretch';

            const head = el('div');
            head.style.display = 'flex';
            head.style.alignItems = 'center';
            head.style.gap = '10px';

            const strong = document.createElement('strong');
            strong.textContent = label;

            const removeRoomBtn = el('button', 'remove-btn');
            removeRoomBtn.type = 'button';
            removeRoomBtn.textContent = 'Entfernen';
            removeRoomBtn.addEventListener('click', () => card.remove());

            head.appendChild(strong);
            head.appendChild(removeRoomBtn);
            card.appendChild(head);

            const furniturePairs = [];
            const tail = [];
            for (let k = 0; k < subfields.length;) {
              const a = subfields[k], b = subfields[k + 1];
              if (a && a.type === 'textarea') { tail.push(a); k++; continue; }
              if (a && b && a.type === 'checkbox' && b.type === 'text') {
                const nice = (a.label || '').replace(/ vorhanden$/i, '').trim();
                furniturePairs.push({ title: nice, present: a, defect: b });
                k += 2;
              } else {
                k++;
              }
            }

            const innerWrap = el('div', 'field-selector');
            const innerSelect = document.createElement('select');
            const def = document.createElement('option');
            def.value = '';
            def.textContent = '-- Ausstattung wählen --';
            innerSelect.appendChild(def);

            furniturePairs.forEach((p, idx) => {
              const o = document.createElement('option');
              o.value = String(idx);
              o.textContent = p.title;
              innerSelect.appendChild(o);
            });

            const innerAdd = document.createElement('button');
            innerAdd.type = 'button';
            innerAdd.textContent = '+';

            innerWrap.appendChild(innerSelect);
            innerWrap.appendChild(innerAdd);
            card.appendChild(innerWrap);

            const itemsWrap = el('div');
            card.appendChild(itemsWrap);

            innerAdd.addEventListener('click', () => {
              const val = innerSelect.value;
              if (val === '') return;
              const pair = furniturePairs[Number(val)];

              if (itemsWrap.querySelector(`[data-key="${pair.present.name}"]`)) return;

              const row = el('div', 'field-item');
              row.dataset.key = pair.present.name;

              const cbLabel = document.createElement('label');
              cbLabel.textContent = pair.present.label;
              const cb = document.createElement('input');
              cb.type = 'checkbox';
              cb.name = pair.present.name;
              if (pair.present.checked) cb.checked = true;

              const mgLabel = document.createElement('label');
              mgLabel.textContent = pair.defect.label;
              const mg = document.createElement('input');
              mg.type = 'text';
              mg.name = pair.defect.name;

              const rm = el('button', 'remove-btn');
              rm.type = 'button';
              rm.textContent = 'x';
              rm.addEventListener('click', () => row.remove());

              row.append(cbLabel, cb, mgLabel, mg, rm);
              itemsWrap.appendChild(row);
            });

            tail.filter(t => t.type === 'textarea').forEach(t => {
              addLabelInput(card, t.label, t.name, 'textarea');
            });

            container.appendChild(card);
            select.value = '';
            return;
          }

          // --- Standard: Gruppe mit Subfeldern oder Einzel-Feld ---
          if (type === 'multi' && Array.isArray(subfields) && subfields.length) {
            const wrap = el('div', 'field-item');
            const strong = document.createElement('strong');
            strong.textContent = label;
            wrap.appendChild(strong);

            subfields.forEach(sf => {
              const lab = document.createElement('label');
              lab.textContent = sf.label;
              wrap.appendChild(lab);

              let input;
              if (sf.type === 'checkbox') {
                input = document.createElement('input');
                input.type = 'checkbox';
                if (sf.checked) input.checked = true;
                input.style.width = 'auto';
              } else if (sf.type === 'textarea') {
                input = document.createElement('textarea');
              } else {
                input = document.createElement('input');
                input.type = sf.type || 'text';
              }
              input.name = sf.name;
              wrap.appendChild(input);
            });

            const rm = el('button', 'remove-btn');
            rm.type = 'button';
            rm.textContent = 'Entfernen';
            rm.addEventListener('click', () => wrap.remove());
            wrap.appendChild(rm);

            container.appendChild(wrap);
          } else {
            const row = el('div', 'field-item');
            const lab = document.createElement('label');
            lab.textContent = label;
            row.appendChild(lab);

            const input = document.createElement('input');
            input.name = optEl.value;
            input.type = type || 'text';
            row.appendChild(input);

            const rm = el('button', 'remove-btn');
            rm.type = 'button';
            rm.textContent = 'Entfernen';
            rm.addEventListener('click', () => row.remove());
            row.appendChild(rm);

            container.appendChild(row);
          }

          select.value = '';
        });
      }
    }
  });

  // ---------- Speichern (Anzeige + LocalStorage) ----------
  document.getElementById('save-btn')?.addEventListener('click', () => {
    const fd = new FormData(form);
    const entries = {};
    for (const [k, v] of fd.entries()) entries[k] = v;

    form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      if (!entries.hasOwnProperty(cb.name)) {
        entries[cb.name] = cb.checked ? 'on' : '';
      }
    });

    const ul = document.createElement('ul');
    Object.entries(entries).forEach(([k, v]) => {
      if (String(v).trim() === '') return;
      const li = document.createElement('li');
      li.textContent = `${k}: ${v}`;
      ul.appendChild(li);
    });

    out.innerHTML = '<h2>Eingegebene Daten:</h2>';
    out.appendChild(ul);
    out.style.display = 'block';

    try {
      localStorage.setItem('abnahme_form_data', JSON.stringify(entries));
    } catch (e) {}
  });

  // ---------- Reset ----------
  document.getElementById('reset-btn')?.addEventListener('click', () => {
    if (!confirm('Alle Eingaben löschen?')) return;
    form.reset();
    [...root.querySelectorAll('[id^="fields-container-"]')].forEach(c => c.innerHTML = '');
    out.style.display = 'none';
    try { localStorage.removeItem('abnahme_form_data'); } catch (e) {}
  });

  // ---------- Laden (falls vorhanden) ----------
  (function restore() {
    try {
      const raw = localStorage.getItem('abnahme_form_data');
      if (!raw) return;
      const data = JSON.parse(raw);
      form.querySelectorAll('input, textarea').forEach(inp => {
        if (!inp.name) return;
        if (inp.type === 'checkbox') {
          inp.checked = data[inp.name] === 'on';
        } else if (data[inp.name] != null) {
          inp.value = data[inp.name];
        }
      });
    } catch (e) {}
  })();

  // ---------- Echte PDF mit pdf-lib ----------
  document.getElementById('pdf-btn')?.addEventListener('click', async () => {
    if (!window.PDFLib) {
      alert('PDF-Bibliothek (pdf-lib) nicht geladen. Bitte vendor/pdf-lib.min.js einbinden.');
      return;
    }

    const { PDFDocument, StandardFonts, rgb } = PDFLib;

    try {
      // Daten einsammeln
      const fd = new FormData(form);
      const data = {};
      for (const [k, v] of fd.entries()) data[k] = v;
      form.querySelectorAll('input[type="checkbox"]').forEach(cb => {
        if (!(cb.name in data)) data[cb.name] = cb.checked ? 'on' : '';
      });
      const yes = v => (String(v).trim().toLowerCase() === 'on' ? 'Ja' : String(v).trim());
      const get = k => (data[k] || '').toString().trim();

      // PDF vorbereiten
      const pdf = await PDFDocument.create();

      // Font: versuche DejaVuSans, fallback auf Standard Helvetica
      let font = null;
      try {
        const fontBytes = await fetch('./fonts/DejaVuSans.ttf', { cache: 'force-cache' }).then(r => r.ok ? r.arrayBuffer() : Promise.reject());
        font = await pdf.embedFont(fontBytes, { subset: true });
      } catch (_) {
        const helv = await pdf.embedFont(StandardFonts.Helvetica);
        font = helv;
      }

      const pageMargin = 30;
      const pageWidth = 595;  // A4
      const pageHeight = 842; // A4
      const labelCol = 210;
      const valueCol = pageWidth - 2*pageMargin - labelCol;

      let page = pdf.addPage([pageWidth, pageHeight]);
      let x = pageMargin, y = pageHeight - pageMargin;

      const drawText = (txt, px, py, size=10) => {
        page.drawText(txt, { x: px, y: py, size, font, color: rgb(0,0,0) });
      };
      const lineHeight = (size=10) => size + 4;

      const wrap = (txt, maxWidth, size=10) => {
        if (Array.isArray(txt)) {
          // bereits zeilen (z. B. Subfeldliste)
          return txt.flatMap(t => wrap(String(t), maxWidth, size));
        }
        const words = (txt||'').split(/\s+/);
        const lines = [];
        let cur = '';
        const widthOf = s => font.widthOfTextAtSize(s, size);
        words.forEach(w => {
          const test = cur ? cur + ' ' + w : w;
          if (widthOf(test) <= maxWidth) {
            cur = test;
          } else {
            if (cur) lines.push(cur);
            cur = w;
          }
        });
        if (cur) lines.push(cur);
        return lines;
      };

      const ensureSpace = (need) => {
        if (y - need < pageMargin + 60) {
          page = pdf.addPage([pageWidth, pageHeight]);
          x = pageMargin; y = pageHeight - pageMargin;
        }
      };

      // Titel
      const title = 'Wohnungsabnahmeprotokoll';
      const tSize = 18;
      ensureSpace(tSize + 10);
      drawText(title, x, y - tSize, tSize);
      y -= tSize + 10;

      const drawH2 = (txt) => {
        const s = 14;
        ensureSpace(s + 6);
        drawText(txt, x, y - s, s);
        y -= s + 6;
      };

      const drawRow = (label, value) => {
        const s = 10;
        const lh = lineHeight(s);
        const labLines = wrap(label, labelCol, s);
        const valLines = wrap(value, valueCol, s);
        const rows = Math.max(labLines.length, valLines.length);
        const need = rows*lh + 2;
        ensureSpace(need);
        for (let i=0;i<rows;i++){
          const labTxt = labLines[i] || '';
          const valTxt = valLines[i] || '';
          if (labTxt) drawText(labTxt, x, y - s, s);
          if (valTxt) drawText(valTxt, x + labelCol + 10, y - s, s);
          y -= lh;
        }
        y -= 2;
        page.drawLine({
          start: {x, y},
          end: {x: pageWidth - pageMargin, y},
          thickness: 0.5,
          color: rgb(0.85,0.85,0.85)
        });
        y -= 4;
      };

      // Inhalte wie im Backend
      window.form_sections.forEach(section => {
        const rows = [];

        (section.fields || []).forEach(f => {
          const v = get(f.name);
          if (v) rows.push([f.label, v]);
        });

        (section.options || []).forEach(opt => {
          const sub = opt.subfields || [];
          if (!sub.length) {
            const v = get(opt.name);
            if (v) rows.push([opt.label, yes(v)]);
          } else {
            const inner = [];
            sub.forEach(sf => {
              if (sf.type === 'checkbox') {
                if (yes(get(sf.name)) === 'Ja') inner.push(`${sf.label}: Ja`);
              } else {
                const v = get(sf.name);
                if (v) inner.push(`${sf.label}: ${v}`);
              }
            });
            if (inner.length) rows.push([opt.label, inner]);
          }
        });

        if (!rows.length) return;

        drawH2(section.title);
        if (section.title === 'Schlüsselrückgabe') {
          drawRow('', 'Der Mieter hat folgende Schlüssel zurückgegeben:');
        } else if (section.title === 'Zählerstände') {
          drawRow('', 'Folgende Zählerstände wurden bei der Wohnungsabnahme von beiden Parteien abgelesen:');
        }

        rows.forEach(([lab, val]) => drawRow(lab, val));
      });

      // Unterschriften
      const rawDate = get('datum');
      let header = 'Dresden, den .............................';
      if (rawDate) {
        try {
          const d = new Date(rawDate);
          const dd = String(d.getDate()).padStart(2,'0');
          const mm = String(d.getMonth()+1).padStart(2,'0');
          const yyyy = d.getFullYear();
          header = `Dresden, den ${dd}.${mm}.${yyyy}`;
        } catch (e) {}
      }

      drawH2('Unterschriften');

      // Parameter
      const gap = 20;                          // Abstand zwischen den Feldern
      const fieldH = 90;                       // Höhe der Unterschriftsfelder
      const borderW = 1;
      const labelSize = 9;                     // Schriftgröße für Label
      const labelPadX = 6;                     // horizontales Padding hinter Label
      const labelPadY = 2;                     // vertikales Padding hinter Label
      const textLineGap = 2;                   // Zeilenabstand fürs Label

      // Hilfsfunktionen
      const measure = (txt, size=labelSize) => font.widthOfTextAtSize(txt, size);
      const draw = (txt, x, y, size=10) => drawText(txt, x, y, size);

      // Einfache Wort-Umbrech-Funktion auf Basis der verfügbaren Breite
      function wrapText(txt, maxWidth, size=labelSize) {
        const words = txt.split(/\s+/);
        const lines = [];
        let line = '';

        for (const w of words) {
          const test = line ? line + ' ' + w : w;
          if (measure(test, size) <= maxWidth) {
            line = test;
          } else {
            if (line) lines.push(line);
            line = w;
          }
        }
        if (line) lines.push(line);
        // Max. zwei Zeilen für sauberes Layout
        if (lines.length > 2) {
          // Falls zu lang: zweite Zeile „…“
          const ellipsis = '…';
          let l2 = lines[1];
          while (measure(l2 + ellipsis, size) > maxWidth && l2.length > 0) {
            l2 = l2.slice(0, -1);
          }
          lines[1] = l2 + ellipsis;
          return lines.slice(0, 2);
        }
        return lines;
      }

      // Layout-Berechnung
      const halfW = (pageWidth - 2*pageMargin - gap) / 2;
      const boxTopY = y - 16;                  // Start knapp unter der Überschrift/Datum
      const leftX = x;
      const rightX = x + halfW + gap;

      // Zeichnet ein Feld mit zentriertem „Legend“-Label
      function drawSignatureField(boxX, boxY, boxW, boxH, labelText) {
        // 1) Rahmen
        page.drawRectangle({
          x: boxX,
          y: boxY - boxH,
          width: boxW,
          height: boxH,
          borderWidth: borderW,
          borderColor: rgb(0, 0, 0)
        });

        // 2) Label (zentriert oben, „Legend“-Stil: weißen Hintergrund über Rahmen ziehen)
        const labelMaxW = boxW * 0.9; // etwas Rand
        const lines = wrapText(labelText, labelMaxW, labelSize);

        // Gesamthöhe des Labels
        const lineHeight = labelSize + textLineGap;
        const labelBlockH = lines.length * lineHeight - textLineGap;

        // Label-Baseline (innen am oberen Rand)
        const firstLineBaselineY = boxY - labelPadY - labelSize; // Text sitzt knapp unter dem oberen Rahmen

        // Weißer Hintergrund, um den Rahmen zu „unterbrechen“
        // Breite = breiteste Zeile + Padding
        const widest = Math.max(...lines.map(l => measure(l, labelSize)));
        const bgW = widest + 2*labelPadX;
        const bgX = boxX + (boxW - bgW)/2;
        const bgY = boxY - labelPadY - labelBlockH - (labelSize - 7); // kleine Feinjustierung

        page.drawRectangle({
          x: bgX,
          y: bgY,
          width: bgW,
          height: labelBlockH + labelPadY*2,
          color: rgb(1, 1, 1) // Weiß über dem Rahmen
        });

        // 3) Textzeilen zentriert zeichnen
        let lineY = firstLineBaselineY;
        for (const l of lines) {
          const w = measure(l, labelSize);
          draw(l, boxX + (boxW - w)/2, lineY, labelSize);
          lineY -= lineHeight;
        }

        // Optional: eine Signatur-Linie im Feld (falls gewünscht)
        const signLineY = boxY - boxH + 22;
        page.drawLine({
          start: { x: boxX + 20, y: signLineY },
          end:   { x: boxX + boxW - 20, y: signLineY },
          thickness: 0.8,
          color: rgb(0, 0, 0)
        });
      }

      // Felder zeichnen
      drawRow('', header); // wie bei dir
      drawSignatureField(
        leftX,  boxTopY, halfW, fieldH,
        'Unterschrift des Vermieters bzw. seines Bevollmächtigten'
      );
      drawSignatureField(
        rightX, boxTopY, halfW, fieldH,
        'Unterschrift des Mieters bzw. seines Bevollmächtigten'
      );

      // Platz nach unten reservieren
      y = boxTopY - fieldH - 24;

      // Ausgabe
      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const filename = 'Wohnungsabnahmeprotokoll.pdf';

      // iPad/iOS teilen/speichern
      const file = new File([blob], filename, { type: 'application/pdf' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Wohnungsabnahmeprotokoll',
          text: 'Erstellt mit dem Abnahmeformular',
          files: [file]
        });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a); a.click(); a.remove();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error(err);
      alert('PDF-Erstellung fehlgeschlagen.');
    }
  });
})();
