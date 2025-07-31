// Music control functionality
        let isPlaying = false;
        const music = document.getElementById('bg-music');
        const musicToggle = document.getElementById('music-toggle');

        function toggleMusic() {
            if (isPlaying) {
                music.pause();
                musicToggle.textContent = '🎵 Play Music';
                musicToggle.classList.remove('playing');
                isPlaying = false;
            } else {
                music.play().then(() => {
                    musicToggle.textContent = '⏸️ Pause Music';
                    musicToggle.classList.add('playing');
                    isPlaying = true;
                }).catch(error => {
                    console.log('Audio playback failed:', error);
                    // Fallback for browsers that require user interaction
                    musicToggle.textContent = '🎵 Click to Play';
                });
            }
        }

        // Add event listener for music toggle
        musicToggle.addEventListener('click', toggleMusic);

        // Handle audio events
        music.addEventListener('ended', () => {
            musicToggle.textContent = '🎵 Play Music';
            musicToggle.classList.remove('playing');
            isPlaying = false;
        });

        music.addEventListener('pause', () => {
            musicToggle.textContent = '🎵 Play Music';
            musicToggle.classList.remove('playing');
            isPlaying = false;
        });

        music.addEventListener('play', () => {
            musicToggle.textContent = '⏸️ Pause Music';
            musicToggle.classList.add('playing');
            isPlaying = true;
        });

        // Envelope functionality
        function openEnvelope() {
            const envelope = document.getElementById('envelope');
            const loveLetter = document.getElementById('love-letter');
            
            envelope.classList.add('opened');
            
            setTimeout(() => {
                loveLetter.classList.add('show');
                envelope.style.display = 'none';
            }, 600);
        }

        // Love button bounce effect
        function bounceEffect(button) {
            button.style.animation = 'none';
            setTimeout(() => {
                button.style.animation = 'bounce 0.6s ease-out';
            }, 10);
            
            // Create floating hearts
            createFloatingHearts(button);
        }

        // Create floating hearts effect
        function createFloatingHearts(element) {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 6; i++) {
                const heart = document.createElement('div');
                heart.innerHTML = '❤️';
                heart.style.position = 'fixed';
                heart.style.left = centerX + 'px';
                heart.style.top = centerY + 'px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '1000';
                heart.style.fontSize = '20px';
                heart.style.animation = `floatHeart 2s ease-out forwards`;
                heart.style.animationDelay = (i * 0.1) + 's';
                
                document.body.appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 2000);
            }
        }

        // Add CSS for floating hearts animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatHeart {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.random() * 200 - 100}px, -100px) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Create background particles
        function createParticles() {
            const particles = document.getElementById('particles');
            
            // Create regular particles
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particles.appendChild(particle);
            }
            
            // Create heart particles
            for (let i = 0; i < 15; i++) {
                const heart = document.createElement('div');
                heart.className = 'heart-particle';
                heart.innerHTML = '💖';
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDelay = Math.random() * 8 + 's';
                heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
                particles.appendChild(heart);
            }
        }

        // Initialize particles when page loads
        document.addEventListener('DOMContentLoaded', createParticles);

        // Auto-play attempt (might be blocked by browser)
        document.addEventListener('click', function() {
            if (!isPlaying && music.paused) {
                music.play().catch(e => console.log('Auto-play prevented'));
            }
        }, { once: true });