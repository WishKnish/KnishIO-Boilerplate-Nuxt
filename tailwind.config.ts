import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
    theme: {
        extend: {
            fontFamily: {
                sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
            },
            colors: {
                yipi: {
                    50: '#F4F4F9',
                    100: '#F4F4F9',
                    200: '#F4F4F9',
                    300: '#F4F4F9',
                    400: '#F4F4F9',
                    500: '#F4F4F9',
                    600: '#F4F4F9',
                    700: '#F4F4F9',
                    800: '#F4F4F9',
                    900: '#2795C5',
                    950: '#2795C5'
                }
            }
        }
    }
}
