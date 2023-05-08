export function createRow(...elements: HTMLElement[]): HTMLElement {
  const container = document.createElement('div');
  container.style.display = 'flex';

  elements.forEach((element) => container.appendChild(element));
  return container;
}

export function createBreak() {
  const br = document.createElement('div');
  br.style.flexBasis = '100%';
  br.style.height = '4px';
  return br;
}

export function createButton(
  text: string,
  fn: (setText: (text: string) => void) => void
) {
  let button = document.createElement('button');
  button.innerText = text;

  const setText = (text: string) => (button.innerText = text);
  button.onclick = () => fn(setText);

  return button;
}

export function createCheckbox(
  text: string,
  checked: boolean,
  fn: (setChecked: (checked: boolean) => void) => void
) {
  return createInput(text, checked, 'checkbox', fn);
}

export function createRadioInput(
  text: string,
  checked: boolean,
  fn: (setChecked: (checked: boolean) => void) => void
) {
  return createInput(text, checked, 'radio', fn);
}

function createInput(
  text: string,
  checked: boolean,
  type: 'checkbox' | 'radio',
  fn: (setChecked: (checked: boolean) => void) => void
) {
  let checkbox = document.createElement('input');
  checkbox.type = type;
  checkbox.checked = checked;

  const setChecked = (checked: boolean) => (checkbox.checked = checked);
  checkbox.onclick = () => fn(setChecked);

  const label = document.createElement('div');
  label.innerText = text;

  const container = document.createElement('div');
  container.appendChild(checkbox);
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.columnGap = '2px';
  container.style.alignItems = 'start';

  container.appendChild(label);

  return container;
}
