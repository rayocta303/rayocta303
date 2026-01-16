tailwind.config = {
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: 'var(--theme-bg)',
                    darker: 'var(--theme-bg-darker)',
                    green: 'var(--theme-primary)', /* Primary: Purple */
                    cyan: 'var(--theme-secondary)', /* Secondary: Cyan */
                    pink: 'var(--theme-tertiary)', /* Tertiary: Fuchsia */
                    glass: 'var(--theme-glass)',
                    border: 'var(--theme-border)'
                }
            },
            fontFamily: {
                sans: ['Rajdhani', 'sans-serif'],
                heading: ['Rajdhani', 'sans-serif'],
                mono: ['Space Grotesk', 'monospace'],
            },
            animation: {
                'spin-slow': 'spin 12s linear infinite',
            }
        }
    }
}
