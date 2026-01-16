gsap.registerPlugin(TextPlugin);

// Preloader Animation
const loaderTl = gsap.timeline();
const progress = { value: 0 };

loaderTl.to(progress, {
    value: 100,
    duration: 2,
    ease: "power2.inOut",
    onUpdate: () => {
        document.getElementById("loader-percentage").innerText = Math.round(progress.value) + "%";
    }
})
    .to("#loader-percentage", { opacity: 0, duration: 0.2, delay: 0.2 }) // Fade out text first
    .to("#preloader", {
        opacity: 0,
        duration: 0.5,
        // Flicker effect using keyframes
        keyframes: [
            { opacity: 1, duration: 0.05 },
            { opacity: 0, duration: 0.05 },
            { opacity: 0.8, duration: 0.05 },
            { opacity: 0.1, duration: 0.05 },
            { opacity: 1, duration: 0.05 },
            { opacity: 0, duration: 0.05 },
            { opacity: 0.5, duration: 0.05 },
            { opacity: 0, duration: 0.15 }
        ],
        onComplete: () => {
            gsap.set("#preloader", { display: "none" });
        }
    })
    .add(() => {
        initHeroAnimations();
    });

function initHeroAnimations() {
    const heroTl = gsap.timeline();

    // Flicker Animation for the entire Left Menu Container
    heroTl.fromTo("div.lg\\:col-span-5",
        { opacity: 0 },
        {
            opacity: 1,
            duration: 1.5,
            keyframes: [
                { opacity: 0, duration: 0 },
                { opacity: 0.4, duration: 0.05 },
                { opacity: 0.1, duration: 0.05 },
                { opacity: 1, duration: 0.05 },
                { opacity: 0.1, duration: 0.1 },
                { opacity: 1, duration: 0.05 },
                { opacity: 0, duration: 0.05 },
                { opacity: 1, duration: 0.1 },
                { opacity: 1, duration: 1 } // Stay visible
            ],
            ease: "none"
        }
    );

    // Optional: Slide children slightly for "settling" effect (less aggressive than before)
    heroTl.fromTo("div.lg\\:col-span-5 h1",
        { x: -30 },
        { x: 0, duration: 0.8, ease: "power3.out" },
        "<"
    )
        .fromTo("div.lg\\:col-span-5 p",
            { x: -30 },
            { x: 0, duration: 1, ease: "power3.out" },
            "<0.1"
        )
        .fromTo("#main-menu button, #main-menu a",
            { x: -20, opacity: 0, transition: "none" },
            {
                x: 0,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.2)",
                onComplete: () => {
                    gsap.set("#main-menu button, #main-menu a", { clearProps: "transition" });
                }
            },
            "<0.2"
        );
}

// Random Coords
setInterval(() => {
    // Only update if element exists (in case it's commented out)
    const coordsEl = document.getElementById('coords');
    if (coordsEl) {
        coordsEl.innerText =
            Math.floor(Math.random() * 99) + ':' + Math.floor(Math.random() * 99) + ':' + Math.floor(Math.random() * 99);
    }
}, 1000);


// Alpine Data Component
document.addEventListener('alpine:init', () => {
    Alpine.data('portfolio', () => ({
        activeTab: 'about',
        mobileOpen: false,
        glitchSeed: 0.1,
        soundEnabled: true,
        galleryModalOpen: false,
        activeGalleryItem: null,
        galleryItems: [],
        services: [],
        about: null,
        projects: [],
        currentImageIndex: 0,

        init() {
            // Fetch Projects Data
            fetch('data/projects.json')
                .then(response => response.json())
                .then(data => {
                    this.projects = data;
                })
                .catch(error => console.error('Error loading projects data:', error));

            // Fetch About Data
            fetch('data/about.json')
                .then(response => response.json())
                .then(data => {
                    this.about = data;
                })
                .catch(error => console.error('Error loading about data:', error));

            // Fetch Gallery Data
            fetch('data/gallery.json')
                .then(response => response.json())
                .then(data => {
                    this.galleryItems = data;
                })
                .catch(error => console.error('Error loading gallery data:', error));

            // Fetch Services Data
            fetch('data/services.json')
                .then(response => response.json())
                .then(data => {
                    this.services = data;
                })
                .catch(error => console.error('Error loading services data:', error));
        },

        toggleSound() {
            this.soundEnabled = !this.soundEnabled;
        },
        playSound() {
            if (!this.soundEnabled) return;
            const audio = new Audio('assets/sound/button.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.log('Audio play failed:', e));
        },
        playFx() {
            if (!this.soundEnabled) return;
            const audio = new Audio('assets/sound/fx.mp3');
            audio.volume = 0.5;
            audio.play().catch(e => console.log('Fx play failed:', e));
        },
        setTab(tab) {
            this.activeTab = '';
            setTimeout(() => {
                this.activeTab = tab;
                this.glitchSeed = Math.floor(Math.random() * 2) + 1;
                this.playFx();
                if (window.innerWidth < 1024) this.mobileOpen = true;
            }, 800);
        },
        parseMarkdown(text) {
            return marked.parse(text);
        },
        openGallery(item) {
            this.activeGalleryItem = item;
            this.currentImageIndex = 0;
            this.galleryModalOpen = true;
            this.playSound();
        },
        closeGallery() {
            this.galleryModalOpen = false;
            this.playSound();
            setTimeout(() => { this.activeGalleryItem = null; }, 300);
        },
        nextImage() {
            if (!this.activeGalleryItem || !this.activeGalleryItem.images) return;
            this.currentImageIndex = (this.currentImageIndex + 1) % this.activeGalleryItem.images.length;
        },
        prevImage() {
            if (!this.activeGalleryItem || !this.activeGalleryItem.images) return;
            this.currentImageIndex = (this.currentImageIndex - 1 + this.activeGalleryItem.images.length) % this.activeGalleryItem.images.length;
        },
        closeGallery() {
            this.galleryModalOpen = false;
            this.playSound();
            setTimeout(() => { this.activeGalleryItem = null; }, 300);
        }
    }));
});
