
  window.form_sections = [
    {
      "title": "Allgemeine Daten",
      "fields": [
        {"label": "Datum", "name": "datum", "type": "date"},
        {"label": "zur Wohnung (Nr., Etage, Objekt)", "name": "wohnung_nr_etage_objekt", "type": "text"},
        {"label": "Straße, Hausnummer", "name": "straße_hausnummer", "type": "text"},
        {"label": "Postleitzahl, Ort", "name": "plz_ort", "type": "text"},
        {"label": "Übergebender (Mieter)", "name": "uebergebender", "type": "text"},
        {"label": "Übernehmender (Vermieter)", "name": "uebernehmender", "type": "text"}
      ]
    },

    {
      "title": "Schlüsselrückgabe",
      "fields": [
        {"label": "Haus-/Wohnungsschlüssel (Anzahl)", "name": "haus_schluessel", "type": "number"},
        {"label": "Haus-/Wohnungsschlüssel Nr.", "name": "haus_schluessel_nr", "type": "text"},
        {"label": "Briefkastenschlüssel (Anzahl)", "name": "brief_schluessel", "type": "number"},
        {"label": "Zimmerschlüssel (Anzahl)", "name": "zimmer_schluessel", "type": "number"}
      ]
    },

    {
      "title": "Zählerstände",
      "options": [
        {
          "label": "Warmwasser",
          "name": "warmwasser",
          "type": "multi",
          "subfields": [
            {"label": "Zähler-Nr.", "name": "warmwasser_nr", "type": "text"},
            {"label": "Zählerstand", "name": "warmwasser_stand", "type": "text"}
          ]
        },
        {
          "label": "Kaltwasser",
          "name": "kaltwasser",
          "type": "multi",
          "subfields": [
            {"label": "Zähler-Nr.", "name": "kaltwasser_nr", "type": "text"},
            {"label": "Zählerstand", "name": "kaltwasser_stand", "type": "text"}
          ]
        },
        {
          "label": "Strom",
          "name": "strom",
          "type": "multi",
          "subfields": [
            {"label": "Zähler-Nr.", "name": "strom_nr", "type": "text"},
            {"label": "Zählerstand", "name": "strom_stand", "type": "text"}
          ]
        },
        {
          "label": "Heizung Bad",
          "name": "heizung_bad",
          "type": "multi",
          "subfields": [
            {"label": "Zähler-Nr.", "name": "heizung_bad_nr", "type": "text"},
            {"label": "Zählerstand", "name": "heizung_bad_stand", "type": "text"}
          ]
        },
        {
          "label": "Heizung Wohnzimmer",
          "name": "heizung_wohnzimmer",
          "type": "multi",
          "subfields": [
            {"label": "Zähler-Nr.", "name": "heizung_wohnzimmer_nr", "type": "text"},
            {"label": "Zählerstand", "name": "heizung_wohnzimmer_stand", "type": "text"}
          ]
        },
        {
          "label": "Heizung Schlafzimmer",
          "name": "heizung_schlafzimmer",
          "type": "multi",
          "subfields": [
            {"label": "Zähler-Nr.", "name": "heizung_schlafzimmer_nr", "type": "text"},
            {"label": "Zählerstand", "name": "heizung_schlafzimmer_stand", "type": "text"}
          ]
        },
        {
          "label": "Heizung Küche",
          "name": "heizung_kueche",
          "type": "multi",
          "subfields": [
            {"label": "Zähler-Nr.", "name": "heizung_kueche_nr", "type": "text"},
            {"label": "Zählerstand", "name": "heizung_kueche_stand", "type": "text"}
          ]
        },
        {
          "label": "Heizung Diele",
          "name": "heizung_diele",
          "type": "multi",
          "subfields": [
            {"label": "Zähler-Nr.", "name": "heizung_diele_nr", "type": "text"},
            {"label": "Zählerstand", "name": "heizung_diele_stand", "type": "text"}
          ]
        }
      ]
    },

    {
      "title": "Ausstattung / Mängel - Bad",
      "fields": [
        {"label": "Bodenbelag (Beschreibung)", "name": "boden_bad", "type": "textarea"},
        {"label": "Wandbelag (Beschreibung)", "name": "waende_bad", "type": "textarea"}
      ],
      "options": [
        {
          "label": "Badewanne mit Wannenfüll- und Brausebatterie",
          "name": "badewanne",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "badewanne", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "badewanne_maengel", "type": "text"}
          ]
        },
        {
          "label": "Duschkabine mit Armatur",
          "name": "duschkabine",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "duschkabine", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "duschkabine_maengel", "type": "text"}
          ]
        },
        {
          "label": "Waschbecken mit Armatur",
          "name": "waschbecken",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "waschbecken", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "waschbecken_maengel", "type": "text"}
          ]
        },
        {
          "label": "WC-Anlage",
          "name": "wc",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "wc", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "wc_maengel", "type": "text"}
          ]
        },
        {
          "label": "Gäste-WC mit Handwaschbecken",
          "name": "gaeste_wc",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "gaeste_wc", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "gaeste_wc_maengel", "type": "text"}
          ]
        },
        {
          "label": "Glas-/Porzellan-/Kunststoffablage",
          "name": "ablage",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "ablage", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "ablage_maengel", "type": "text"}
          ]
        },
        {
          "label": "Doppelglashalter",
          "name": "doppelglashalter",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "doppelglashalter", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "doppelglashalter_maengel", "type": "text"}
          ]
        },
        {
          "label": "Handtuchhalter doppelt",
          "name": "handtuchhalter_doppelt",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "handtuchhalter_doppelt", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "handtuchhalter_doppelt_maengel", "type": "text"}
          ]
        },
        {
          "label": "Handtuchhalter einfach",
          "name": "handtuchhalter_einfach",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "handtuchhalter_einfach", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "handtuchhalter_einfach_maengel", "type": "text"}
          ]
        },
        {
          "label": "Papierhalter",
          "name": "papierhalter",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "papierhalter", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "papierhalter_maengel", "type": "text"}
          ]
        },
        {
          "label": "Spiegel",
          "name": "spiegel",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "spiegel", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "spiegel_maengel", "type": "text"}
          ]
        },
        {
          "label": "Waschmaschinenanschluss",
          "name": "waschmaschinenanschluss",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "waschmaschinenanschluss", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "waschmaschinenanschluss_maengel", "type": "text"}
          ]
        },
        {
          "label": "Toilettenbürstenhalter",
          "name": "toilettenbuerste",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "toilettenbuerste", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "toilettenbuerste_maengel", "type": "text"}
          ]
        }
      ]
    },

    {
      "title": "Ausstattung / Mängel - Küche",
      "fields": [
        {"label": "Bodenbelag (Beschreibung)", "name": "boden_kueche", "type": "textarea"},
        {"label": "Wandbelag (Beschreibung)", "name": "waende_kueche", "type": "textarea"}
      ],
      "options": [
        {
          "label": "Einbauherd und Abzugshaube",
          "name": "herd",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "herd", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "herd_maengel", "type": "text"}
          ]
        },
        {
          "label": "Einbaukühlschrank",
          "name": "kuehlschrank",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "kuehlschrank", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "kuehlschrank_maengel", "type": "text"}
          ]
        },
        {
          "label": "Spüle mit Armatur",
          "name": "spuele",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "spuele", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "spuele_maengel", "type": "text"}
          ]
        },
        {
          "label": "Unterschränke",
          "name": "unterschraenke",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "unterschraenke", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "unterschraenke_maengel", "type": "text"}
          ]
        },
        {
          "label": "Hängeschränke",
          "name": "haengeschraenke",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "haengeschraenke", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "haengeschraenke_maengel", "type": "text"}
          ]
        },
        {
          "label": "Besteckkasten",
          "name": "besteckkasten",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "besteckkasten", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "besteckkasten_maengel", "type": "text"}
          ]
        },
        {
          "label": "Weitere Ausstattung",
          "name": "weitere_ausstattung_kueche",
          "type": "multi",
          "subfields": [
            {"label": "Vorhanden", "name": "weitere_ausstattung_kueche", "type": "checkbox", "checked": true},
            {"label": "Ausstattung", "name": "weitere_ausstattung_kueche_ausstattung", "type": "text"}
          ]
        }
      ]
    },

    {
      "title": "Weitere Räume",
      "options": [
        {
          "label": "Schlafzimmer",
          "name": "schlafzimmer",
          "type": "multi",
          "subfields": [
            {"label": "Bett vorhanden", "name": "schlafzimmer_bett", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "schlafzimmer_bett_maengel", "type": "text"},
            {"label": "Nachtschrank vorhanden", "name": "schlafzimmer_nachtschrank", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "schlafzimmer_nachtschrank_maengel", "type": "text"},
            {"label": "Wandschrank vorhanden", "name": "schlafzimmer_wandschrank", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "schlafzimmer_wandschrank_maengel", "type": "text"},
            {"label": "Tisch vorhanden", "name": "schlafzimmer_tisch", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "schlafzimmer_tisch_maengel", "type": "text"},
            {"label": "Tischleuchte vorhanden", "name": "schlafzimmer_tischleuchte", "type": "checkbox", "checked": true},
            {"label": "Mangel", "name": "schlafzimmer_tischleuchte_maengel", "type": "text"},
            {"label": "Bodenbelag", "name": "boden_schlafzimmer", "type": "textarea"},
            {"label": "Wandbelag", "name": "waende_schlafzimmer", "type": "textarea"}
          ]
        }
      ]
    },

    {
      "title": "Mängelregelung",
      "fields": [
        {"label": "Mängel werden noch beseitigt bis", "name": "maengel_beseitigung_bis", "type": "date"},
        {"label": "Mängel brauchen nicht beseitigt werden (Begründung)", "name": "maengel_begruendung", "type": "textarea"}
      ]
    },
    {
      "title": "Neue Anschrift des Mieters",
      "fields": [
        {"label": "Name", "name": "neue_name", "type": "text"},
        {"label": "Straße, Hausnummer", "name": "neue_strasse", "type": "text"},
        {"label": "Postleitzahl, Wohnort", "name": "neue_wohnort", "type": "text"},
        {"label": "Telefonnummer", "name": "neue_tel", "type": "text"},
        {"label": "Kontoverbindung", "name": "neue_konto", "type": "text"}
      ]
    }
  ];
