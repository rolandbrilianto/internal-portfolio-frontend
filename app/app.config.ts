export default defineAppConfig({
  ui: {
    colors: {
      primary: 'indigo',
      neutral: 'slate'
    },
    button: {
      slots: {
        base: 'font-semibold rounded-md'
      }
    },
    card: {
      slots: {
        root: 'rounded-lg'
      }
    },
    input: {
      slots: {
        base: 'rounded-md'
      }
    },
    select: {
      slots: {
        base: 'rounded-md'
      }
    },
    textarea: {
      slots: {
        base: 'rounded-md'
      }
    },
    badge: {
      slots: {
        base: 'rounded font-medium tracking-wide uppercase'
      }
    },
    alert: {
      slots: {
        title: 'font-semibold',
        description: 'text-sm'
      }
    },
    modal: {
      slots: {
        content: 'rounded-lg'
      }
    },
    slideover: {
      slots: {
        content: 'rounded-none sm:rounded-lg'
      }
    },
    table: {
      slots: {
        th: 'text-muted bg-(--ui-bg-muted)/60 text-xs font-semibold tracking-wider uppercase',
        td: 'align-middle'
      }
    },
    tabs: {
      slots: {
        list: 'bg-(--ui-bg-muted)/60 rounded-md p-1'
      }
    }
  }
})
