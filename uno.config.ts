import presetPappIcon from '@point-hub/preset-papp-icon'
import TransformerDirectives from '@unocss/transformer-directives'
import { defineConfig, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetUno({ mode: 'vue-scoped' }),
    presetPappIcon(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        inter: 'Inter:100,200,300,400,500,600,700,800,900',
        'open-sans': 'Open Sans:100,200,300,400,500,600,700,800,900'
      }
    })
  ],
  transformers: [TransformerDirectives()],
  theme: {
    colors: {
      primary: '#321fda',
      secondary: '#9da5b1',
      info: '#3399ff',
      success: '#2eb85c',
      warning: '#f9b115',
      danger: '#e55353'
    }
  }
})
