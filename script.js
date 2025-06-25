document.addEventListener('DOMContentLoaded', () => {
    // =================================================================================
    // DATA & TRANSLATIONS (TIDAK ADA YANG DIUBAH DI SINI)
    // =================================================================================
    const UI_TEXT = {
        id: {
            reset_all_button: "Reset All", reset_all_confirm: "Yakin ingin menghapus SEMUA opsi custom dan mengembalikan ke setelan pabrik?",
            title: "Pembuat Teks Video AI", subtitle: "Alat ini belajar darimu. Ketik opsi baru & tekan Enter untuk menyimpannya.",
            tab_story: "1. Adegan & Cerita", tab_cinematography: "2. Sinematografi", tab_lighting: "3. Cahaya & Warna", tab_postpro: "4. Gaya & Post-Pro",
            cat_core: "Konsep Inti", cat_mise_en_scene: "Mise-en-scène", cat_camera_lens: "Kamera & Lensa", cat_framing_comp: "Framing & Komposisi", cat_lighting: "Pencahayaan", cat_env_color: "Lingkungan & Warna", cat_post_pro: "Post-Production",
            label_genre: "Genre", label_mood: "Mood & Nuansa", label_worldbuilding: "Worldbuilding / Lore",
            placeholder_worldbuilding: "contoh: Di sebuah dunia di mana ingatan bisa diperjualbelikan...",
            label_lokasi: "Lokasi / Setting (Wajib)", label_set_dressing: "Set Dressing & Properti", label_archetype: "Arketipe Karakter",
            label_subjek: "Subjek Utama (Wajib)", label_emosi: "Ekspresi / Emosi", label_busana: "Busana / Kostum",
            label_aksi: "Aksi / Blocking (Wajib)", label_symbolism: "Simbolisme / Motif", label_camera: "Emulasi Kamera",
            label_lens_prop: "Properti Lensa", label_shot: "Shot & Framing", label_angle: "Angle Kamera",
            label_composition: "Aturan Komposisi", label_gerakan: "Gerakan Kamera", label_light_style: "Gaya Pencahayaan",
            label_light_quality: "Kualitas Cahaya", label_light_source: "Sumber Cahaya Utama", label_light_modifier: "Lighting Modifiers",
            label_waktu: "Waktu & Cuaca", label_palet: "Palet Warna Dominan", label_color_grade: "Color Grade Look",
            label_grain: "Film Grain", label_aspect_ratio: "Rasio Aspek", label_pacing: "Pacing & Editing",
            label_sound_design: "Sound Design (Konseptual)", label_vfx: "Efek Visual (VFX)",
            output_title: "Hasil Prompt", placeholder_output: "Treatment block akan muncul di sini...",
            copy_button: "Salin Prompt", placeholder_combobox: "Pilih atau ketik baru...",
            placeholder_output_error: "MOHON LENGKAPI BAGIAN WAJIB (LOKASI, SUBJEK, AKSI)..."
        },
        en: {
            reset_all_button: "Reset All", reset_all_confirm: "Are you sure you want to delete ALL custom options and restore factory settings?",
            title: "Prompt Video AI Maker", subtitle: "This tool learns from you. Type a new option & press Enter to save it.",
            tab_story: "1. Scene & Story", tab_cinematography: "2. Cinematography", tab_lighting: "3. Lighting & Color", tab_postpro: "4. Style & Post-Pro",
            cat_core: "Core Concept", cat_mise_en_scene: "Mise-en-scène", cat_camera_lens: "Camera & Lens", cat_framing_comp: "Framing & Composition", cat_lighting: "Lighting", cat_env_color: "Environment & Color", cat_post_pro: "Post-Production",
            label_genre: "Genre", label_mood: "Mood & Tone", label_worldbuilding: "Worldbuilding / Lore",
            placeholder_worldbuilding: "e.g., In a world where memories can be traded as currency...",
            label_lokasi: "Location / Setting (Required)", label_set_dressing: "Set Dressing & Props", label_archetype: "Character Archetype",
            label_subjek: "Main Subject (Required)", label_emosi: "Expression / Emotion", label_busana: "Wardrobe / Costume",
            label_aksi: "Action / Blocking (Required)", label_symbolism: "Symbolism / Motifs", label_camera: "Camera Emulation",
            label_lens_prop: "Lens Properties", label_shot: "Shot & Framing", label_angle: "Camera Angle",
            label_composition: "Compositional Rules", label_gerakan: "Camera Movement", label_light_style: "Lighting Style",
            label_light_quality: "Light Quality", label_light_source: "Primary Light Source", label_light_modifier: "Lighting Modifiers",
            label_waktu: "Time & Weather", label_palet: "Dominant Color Palette", label_color_grade: "Color Grade Look",
            label_grain: "Film Grain", label_aspect_ratio: "Aspect Ratio", label_pacing: "Pacing & Editing",
            label_sound_design: "Conceptual Sound Design", label_vfx: "Visual Effects (VFX)",
            output_title: "Prompt Result", placeholder_output: "The treatment block will appear here...",
            copy_button: "Copy Prompt", placeholder_combobox: "Select or type new...",
            placeholder_output_error: "PLEASE FILL REQUIRED FIELDS (LOCATION, SUBJECT, ACTION)..."
        }
    };
    const DEFAULT_OPTIONS = {
        core: {
            genre: [ { en: 'Sci-Fi', id: 'Fiksi Ilmiah' }, { en: 'Film Noir', id: 'Film Noir' }, { en: 'Psychological Thriller', id: 'Thriller Psikologis' }, { en: 'Epic Fantasy', id: 'Fantasi Epik' }, { en: 'Slice of Life', id: 'Potongan Kehidupan' }, { en: 'Horror', id: 'Horor' }, ],
            mood: [ { en: 'Ominous and tense', id: 'Mencekam dan tegang' }, { en: 'Nostalgic and bittersweet', id: 'Nostalgia dan pahit manis' }, { en: 'Whimsical and magical', id: 'Ajaib dan penuh keanehan' }, { en: 'Serene and peaceful', id: 'Tenang dan damai' }, ],
        },
        mise_en_scene: {
            lokasi: [ { en: 'a derelict spaceship bridge', id: 'jembatan pesawat luar angkasa yang terbengkalai' }, { en: 'a rain-slicked city street at night', id: 'jalan kota yang basah karena hujan di malam hari' }, { en: 'a sun-drenched wheat field', id: 'ladang gandum yang dibanjiri sinar matahari' }, { en: 'a cluttered antique bookshop', id: 'toko buku antik yang penuh sesak' }, { en: 'a minimalist, sterile laboratory', id: 'laboratorium steril yang minimalis' }, ],
            set_dressing: [ { en: 'holographic maps flickering', id: 'peta holografik yang berkedip' }, { en: 'newspapers scattered on the floor', id: 'koran-koran berserakan di lantai' }, { en: 'a single wilting flower in a vase', id: 'setangkai bunga layu di dalam vas' }, { en: 'steam rising from manholes', id: 'uap membumbung dari lubang got' }, ],
            archetype: [ { en: 'The Anti-Hero', id: 'Anti-Hero' }, { en: 'The Mentor', id: 'Sang Mentor' }, { en: 'The Innocent', id: 'Yang Polos' }, { en: 'The Rebel', id: 'Sang Pemberontak' } ],
            subjek: [ { en: 'a veteran female captain', id: 'seorang kapten wanita veteran' }, { en: 'a grizzled old detective', id: 'seorang detektif tua yang berpengalaman' }, { en: 'a curious young child', id: 'seorang anak kecil yang penasaran' }, ],
            emosi: [ { en: 'a mix of exhaustion and resolve', id: 'campuran kelelahan dan tekad' }, { en: 'unbridled joy', id: 'kegembiraan yang tak terkendali' }, { en: 'quiet desperation', id: 'keputusasaan yang sunyi' }, ],
            busana: [ { en: 'wearing a tattered navy-blue uniform', id: 'mengenakan seragam biru laut yang compang-camping' }, { en: 'a classic trench coat and fedora', id: 'jas hujan klasik dan topi fedora' }, { en: 'simple, rustic clothing', id: 'pakaian sederhana dan ala pedesaan' }, ],
            aksi: [ { en: 'slowly walks towards the main viewport', id: 'berjalan perlahan menuju jendela utama' }, { en: 'lights a cigarette under a streetlamp', id: 'menyalakan rokok di bawah lampu jalan' }, { en: 'stares into the distance', id: 'menatap ke kejauhan' }, ],
            symbolism: [ { en: 'a recurring motif of a broken clock', id: 'motif jam rusak yang berulang' }, { en: 'the symbolism of wilting flowers', id: 'simbolisme bunga yang layu' }, ],
        },
        camera_lens: {
            camera: [ { en: 'ARRI Alexa 65 (Digital Cinema)', id: 'ARRI Alexa 65 (Sinema Digital)' }, { en: 'RED V-Raptor (High-Res Digital)', id: 'RED V-Raptor (Resolusi Tinggi)' }, { en: 'Sony Venice (Cinematic)', id: 'Sony Venice (Sinematik)' }, { en: 'Bolex 16mm (Vintage Film)', id: 'Bolex 16mm (Film Vintage)' }, ],
            lens_prop: [ { en: 'Modern sharp lens, no distortion', id: 'Lensa modern tajam, tanpa distorsi' }, { en: 'Vintage lens, soft blooming highlights', id: 'Lensa vintage, highlight lembut' }, { en: 'Anamorphic lens, characteristic oval bokeh', id: 'Lensa anamorphic, bokeh oval khas' }, ],
        },
        framing_comp: {
            shot: [ { en: 'Extreme Wide Shot', id: 'Extreme Wide Shot' }, { en: 'Full Shot', id: 'Full Shot' }, { en: 'Medium Shot', id: 'Medium Shot' }, { en: 'Close-Up', id: 'Close-Up' } ],
            angle: [ { en: 'Low-Angle', id: 'Low-Angle (Dari bawah)' }, { en: 'High-Angle', id: 'High-Angle (Dari atas)' }, { en: 'Eye-Level', id: 'Eye-Level (Sejajar mata)' }, { en: 'Dutch Angle', id: 'Dutch Angle (Miring)' } ],
            composition: [ { en: 'Rule of Thirds', id: 'Aturan Sepertiga (Rule of Thirds)' }, { en: 'Centered Composition / Symmetry', id: 'Komposisi Simetris' }, { en: 'Leading Lines', id: 'Garis Penuntun (Leading Lines)' }, { en: 'Frame within a Frame', id: 'Bingkai dalam Bingkai' } ],
            gerakan: [ { en: 'Static Tripod', id: 'Statis di Tripod' }, { en: 'Slow Dolly Push-In', id: 'Dolly Maju Perlahan' }, { en: 'Sweeping Crane Shot', id: 'Crane Shot Menyapu' }, { en: 'Handheld, observational', id: 'Handheld (Goyang Natural)' } ],
        },
        lighting: {
            light_style: [ { en: 'High-Key (bright, low contrast)', id: 'High-Key (terang, kontras rendah)' }, { en: 'Low-Key (dark, high contrast)', id: 'Low-Key (gelap, kontras tinggi)' }, { en: 'Chiaroscuro', id: 'Chiaroscuro (Gelap-terang dramatis)' }, ],
            light_quality: [ { en: 'Hard light with sharp, defined shadows', id: 'Cahaya keras dengan bayangan tajam' }, { en: 'Soft, diffused, wrapping light', id: 'Cahaya lembut, menyebar, dan merangkul' }, ],
            light_source: [ { en: 'a single desk lamp', id: 'sebuah lampu meja tunggal' }, { en: 'the cold light of the moon', id: 'cahaya bulan yang dingin' }, { en: 'flickering neon signs', id: 'papan nama neon yang berkedip' }, ],
            light_modifier: [ { en: 'None', id: 'Tidak Ada' }, { en: 'Gobo to create patterns', id: 'Gobo (untuk menciptakan pola)' }, { en: 'Snoot to narrow the light beam', id: 'Snoot (untuk mempersempit cahaya)' } ],
        },
        env_color: {
            waktu: [ { en: 'Golden Hour, clear sky', id: 'Golden Hour, langit cerah' }, { en: 'Blue Hour, post-rain wet streets', id: 'Blue Hour, jalanan basah pasca hujan' }, { en: 'Midnight, heavy fog', id: 'Tengah malam, kabut tebal' }, ],
            palet: [ { en: 'Analogous Colors (e.g. red, orange, yellow)', id: 'Warna Analog (misal: merah, oranye, kuning)' }, { en: 'Complementary Colors (e.g. blue, orange)', id: 'Warna Komplementer (misal: biru, oranye)' }, { en: 'Monochromatic (shades of one color)', id: 'Monokromatik (gradasi satu warna)' } ],
        },
        post_pro: {
            color_grade: [ { en: 'Bleach Bypass, desaturated and gritty', id: 'Bleach Bypass (pudar dan kasar)' }, { en: 'Teal and Orange, cinematic standard', id: 'Teal dan Oranye (standar sinematik)' }, { en: 'Vibrant, saturated Technicolor look', id: 'Technicolor (penuh warna dan jenuh)' }, ],
            grain: [ { en: 'Clean, no grain', id: 'Bersih, tanpa grain' }, { en: 'Subtle 35mm fine grain', id: 'Grain halus 35mm' }, { en: 'Heavy 16mm coarse grain', id: 'Grain kasar 16mm' } ],
            aspect_ratio: [ { en: '16:9 (Standard Widescreen)', id: '16:9 (Layar Lebar Standar)' }, { en: '2.39:1 (Anamorphic CinemaScope)', id: '2.39:1 (Anamorphic CinemaScope)' } ],
            pacing: [ { en: 'Single, uninterrupted long take', id: 'Long take tunggal tanpa putus' }, { en: 'Extreme slow-motion', id: 'Slow-motion ekstrim' }, { en: 'Fast-paced montage', id: 'Montase tempo cepat' } ],
            sound_design: [ { en: 'Dominant sound: the rhythmic hum of machinery', id: 'Suara dominan: dengungan mesin yang ritmis' }, { en: 'Absolute silence', id: 'Hening total' }, { en: 'Distant, echoing sirens', id: 'Sirine yang menggema di kejauhan' }, ],
            vfx: [ { en: 'None', id: 'Tidak Ada' }, { en: 'Subtle anamorphic lens flares', id: 'Lens flare anamorphic yang subtil' }, { en: 'Beautiful light leaks', id: 'Bocoran cahaya yang indah' }, ],
        }
    };
    const STORAGE_KEY_OPTIONS = 'promptSynthOptionsV9_Stable';
    const STORAGE_KEY_LANG = 'promptSynthLangV9';

    // =================================================================================
    // VARIABEL GLOBAL
    // =================================================================================
    let flatOptions = {}; 
    let currentLang = 'id';

    // =================================================================================
    // FUNGSI INTI
    // =================================================================================

    // Menyimpan semua opsi (termasuk custom) ke localStorage
    function saveOptions() {
        localStorage.setItem(STORAGE_KEY_OPTIONS, JSON.stringify(flatOptions));
    }

    // Memuat opsi dari localStorage, atau dari default jika tidak ada
    function loadOptions() {
        const storedOptions = localStorage.getItem(STORAGE_KEY_OPTIONS);
        if (storedOptions) {
            flatOptions = JSON.parse(storedOptions);
        } else {
            // Ubah struktur default yang nested menjadi flat saat pertama kali dijalankan
            for (const category in DEFAULT_OPTIONS) {
                for (const key in DEFAULT_OPTIONS[category]) {
                    flatOptions[key] = [...DEFAULT_OPTIONS[category][key]];
                }
            }
            saveOptions();
        }
    }

    // Mengganti bahasa seluruh UI
    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(STORAGE_KEY_LANG, lang);

        // Update semua teks statis
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (UI_TEXT[lang][key]) el.textContent = UI_TEXT[lang][key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (UI_TEXT[lang][key]) el.placeholder = UI_TEXT[lang][key];
        });
        document.title = UI_TEXT[lang].title;

        // Update tombol bahasa
        document.getElementById('lang-id').classList.toggle('active', lang === 'id');
        document.getElementById('lang-en').classList.toggle('active', lang === 'en');

        // Render ulang semua combobox dengan bahasa baru
        renderAllComboboxes();
        generatePrompt();
    }
    
    // Fungsi untuk membuat satu per satu combobox
    function createCombobox(container) {
        const wrapper = container.querySelector('.combobox-wrapper');
        if (!wrapper) return;

        const id = container.dataset.comboboxId;
        const options = flatOptions[id];
        if (options === undefined) return;
        
        wrapper.innerHTML = `<input type="text" class="combobox-input" id="${id}" placeholder="${UI_TEXT[currentLang].placeholder_combobox}"> <div class="dropdown-panel"></div>`;

        const input = wrapper.querySelector('.combobox-input');
        const dropdown = wrapper.querySelector('.dropdown-panel');
        
        const addNewOptionIfNeeded = () => {
            const newValue = input.value.trim();
            if (newValue && !options.some(opt => opt.id === newValue || opt.en === newValue)) {
                options.unshift({ en: newValue, id: newValue });
                saveOptions();
            }
        };

        const populateDropdown = (filter = '') => {
            dropdown.innerHTML = '';
            let defaultForThisId = [];
            for (const category in DEFAULT_OPTIONS) { if (DEFAULT_OPTIONS[category][id]) { defaultForThisId = DEFAULT_OPTIONS[category][id]; break; } }
            
            options
                .filter(opt => opt[currentLang] && opt[currentLang].toLowerCase().includes(filter.toLowerCase()))
                .forEach(opt => {
                    const optionEl = document.createElement('div');
                    optionEl.className = 'dropdown-option';
                    
                    const textSpan = document.createElement('span');
                    textSpan.textContent = opt[currentLang];
                    optionEl.appendChild(textSpan);

                    const isUserAdded = !defaultForThisId.some(d => d.en === opt.en);
                    if(isUserAdded) {
                       optionEl.classList.add('user-added');
                       const deleteBtn = document.createElement('span');
                       deleteBtn.className = 'delete-option-btn';
                       deleteBtn.innerHTML = '&times;';
                       deleteBtn.dataset.valueEn = opt.en;
                       
                       deleteBtn.addEventListener('click', e => {
                           e.stopPropagation();
                           const valueToDelete = e.target.dataset.valueEn;
                           const indexToDelete = options.findIndex(o => o.en === valueToDelete);
                           if (indexToDelete > -1) {
                               options.splice(indexToDelete, 1);
                               saveOptions();
                               populateDropdown(input.value);
                           }
                       });
                       optionEl.appendChild(deleteBtn);
                    }
                   
                    optionEl.addEventListener('mousedown', e => { 
                        if (e.target.classList.contains('delete-option-btn')) return;
                        e.preventDefault(); 
                        input.value = opt[currentLang]; 
                        dropdown.style.display = 'none'; 
                        generatePrompt(); 
                    });
                    dropdown.appendChild(optionEl);
                });
        };
        
        input.addEventListener('focus', () => { populateDropdown(input.value); dropdown.style.display = 'block'; });
        input.addEventListener('input', () => { dropdown.style.display = 'block'; populateDropdown(input.value); generatePrompt(); });
        input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); addNewOptionIfNeeded(); input.blur(); } });
        input.addEventListener('blur', () => { addNewOptionIfNeeded(); setTimeout(() => { if (!dropdown.matches(':hover')) { dropdown.style.display = 'none'; } }, 150); generatePrompt(); });
    }

    // --- PENDEKATAN BARU YANG LEBIH AMAN ---
    // Fungsi khusus untuk menggambar semua combobox dari awal.
    function renderAllComboboxes() {
        document.querySelectorAll('[data-combobox-id]').forEach(createCombobox);
    }
    
    // Mengambil nilai bahasa Inggris dari input
    function getEnglishValue(id) {
        const inputElement = document.getElementById(id);
        const val = inputElement ? inputElement.value.trim() : '';
        if (!val) return '';
        
        const options = flatOptions[id];
        if (!options) return val;

        const foundOption = options.find(opt => opt[currentLang] === val);
        return foundOption ? foundOption.en : val;
    }

    // Membuat output text block
    function generatePrompt() {
        const v = {};
        document.querySelectorAll('.combobox-input, textarea').forEach(input => {
            if (input.id) {
                 v[input.id] = (input.tagName === 'TEXTAREA') ? input.value.trim() : getEnglishValue(input.id);
            }
        });

        if (!v.lokasi || !v.subjek || !v.aksi) {
            document.getElementById('hasilPrompt').value = UI_TEXT[currentLang].placeholder_output_error;
            return;
        }

        const formatLine = (label, value) => value ? `${label}: ${value}` : '';
        const formatSubLine = (label, value) => value ? `  - ${label}: ${value}` : '';

        let treatmentLines = [
            '// CONCEPT & WORLD', formatLine('GENRE', v.genre), formatLine('MOOD', v.mood), formatLine('WORLDBUILDING', v.worldbuilding),
            '\n// MISE-EN-SCÈNE', formatLine('LOCATION', v.lokasi), formatLine('SET DRESSING', v.set_dressing),
            `CHARACTER: ${v.subjek || 'N/A'} (${v.archetype || 'N/A'})`,
            formatSubLine('COSTUME', v.busana), formatSubLine('EXPRESSION', v.emosi),
            formatLine('ACTION/BLOCKING', v.aksi), formatLine('SYMBOLISM', v.symbolism),
            '\n// CINEMATOGRAPHY', formatLine('CAMERA', v.camera ? `Emulating ${v.camera}`: ''), formatLine('LENS', v.lens_prop),
            formatLine('SHOT', v.shot && v.angle ? `${v.shot}, from a ${v.angle}` : ''),
            formatLine('COMPOSITION', v.composition ? `Using ${v.composition}` : ''),
            formatLine('MOVEMENT', v.gerakan), '\n// LIGHTING & COLOR', formatLine('LIGHTING STYLE', v.light_style && v.light_quality ? `${v.light_style}, ${v.light_quality}`: ''),
            formatLine('PRIMARY LIGHT SOURCE', v.light_source), formatLine('LIGHT MODIFIERS', v.light_modifier),
            formatLine('ENVIRONMENT', v.waktu), formatLine('COLOR PALETTE', v.palet),
            '\n// POST-PRODUCTION & FX', formatLine('COLOR GRADE', v.color_grade), formatLine('FILM GRAIN', v.grain),
            formatLine('ASPECT RATIO', v.aspect_ratio), formatLine('EDITING/PACING', v.pacing),
            formatLine('CONCEPTUAL SOUND', v.sound_design), formatLine('VFX', v.vfx),
        ];
        
        document.getElementById('hasilPrompt').value = treatmentLines.filter(line => line && line.trim() !== '' && !line.endsWith(': N/A') && !line.endsWith(': ') && !line.endsWith('()')).join('\n');
    }

    // =================================================================================
    // INISIALISASI APLIKASI
    // =================================================================================
    function initializeApp() {
        // Setup semua event listener sekali saja
        document.getElementById('lang-id').addEventListener('click', () => setLanguage('id'));
        document.getElementById('lang-en').addEventListener('click', () => setLanguage('en'));
        
        document.getElementById('reset-all-btn').addEventListener('click', () => {
            if (confirm(UI_TEXT[currentLang].reset_all_confirm)) {
                localStorage.removeItem(STORAGE_KEY_OPTIONS);
                window.location.reload();
            }
        });

        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const targetTab = button.dataset.tab;
                tabContents.forEach(content => { content.classList.remove('active'); if (content.id === targetTab) content.classList.add('active'); });
            });
        });
        
        document.getElementById('copyBtn').addEventListener('click', () => {
            const promptText = document.getElementById('hasilPrompt').value;
            if (promptText && !promptText.startsWith("MOHON")) {
                navigator.clipboard.writeText(promptText).then(() => {
                    const btn = document.getElementById('copyBtn');
                    const originalText = btn.textContent;
                    btn.textContent = '✅ BLOCK COPIED!';
                    btn.style.backgroundColor = 'var(--accent-color)';
                    setTimeout(() => {
                        btn.textContent = UI_TEXT[currentLang].copy_button || originalText;
                        btn.style.backgroundColor = 'var(--copy-btn-bg)';
                    }, 2000);
                });
            } else {
                alert(currentLang === 'id' ? 'Tidak ada treatment block valid untuk di-copy.' : 'No valid treatment block to copy.');
            }
        });

        // Alur inisialisasi yang baru dan lebih aman
        loadOptions();
        const savedLang = localStorage.getItem(STORAGE_KEY_LANG) || 'id';
        setLanguage(savedLang); 
    }

    // Jalankan semuanya!
    initializeApp();
});