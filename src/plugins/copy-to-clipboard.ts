import { h } from 'hastscript'
import { PluginContext } from '~/interface/plugin-context.js'

interface Setting {
  'copy': 'Copy'
  'copy-error': 'Press Ctrl+C to copy'
  'copy-success': 'Copied!'
  'copy-timeout': 5000
}

function createClickCallback(str: string, setting: Setting): string {
  return `(function(button){
    const setting = ${JSON.stringify(setting)}
    const span = button.querySelector('span')

    function setState(state) {
      span.textContent = setting[state];
      button.setAttribute('data-copy-state', state);
    }

    function resetButtonText() {
      setTimeout(function () {
        setState('copy');
      }, setting['copy-timeout']);
    }

    function onSuccess() {
      setState('copy-success');
      resetButtonText();
    }

    function onError(error) {
      error && console.error(error)
      setState('copy-error');
      resetButtonText();
    }

    function fallbackCopyTextToClipboard(str) {
      var textArea = document.createElement('textarea');
      textArea.value = str

      // Avoid scrolling to bottom
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        setTimeout(function () {
          if (successful) onSuccess()
          else onError()

        }, 1);
      } catch (err) {
        setTimeout(function () {
          onError(err)
        }, 1);
      }

      document.body.removeChild(textArea);
    }

    function copyTextToClipboard(str) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(str)
          .then(onSuccess, function () {
            fallbackCopyTextToClipboard(str);
          });
      } else {
        fallbackCopyTextToClipboard(str);
      }
    }

    copyTextToClipboard(${JSON.stringify(str)})
  })(this)`
}

export function createCopyToClipboardPlugin(context: PluginContext): void {
  context.toolbar.buttons.push(({ raw }) => {
    const span = h(
      'span',
      {},
      ['Copy'],
    )

    const copyBtn = h(
      'button',
      {
        type: 'button',
        className: ['copy-to-clipboard-button'],
        onClick: createClickCallback(raw, {
          copy: 'Copy',
          'copy-error': 'Press Ctrl+C to copy',
          'copy-success': 'Copied!',
          'copy-timeout': 5000,
        }),
      },
      [span],
    )

    return copyBtn
  })
}

