const inputTextArea = document.querySelector('#raw');
const outputTextArea = document.querySelector('#clean');
const previewArea = document.querySelector('#code-preview>pre>code#code');
const convertBtn = document.querySelector('button#convert-btn');
const copyBtn = document.querySelector('button#copy-btn');

// Returns key for a character value passed
const findKey = function(obj, value) {
  let key = null;
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (obj[prop] === value) {
        key = prop;
      }
    }
  }
  return key;
};

// Cleaning Function
const getCleanCode = (rawCode) => {
  let cleanCode = '';
  for (let i = 0; i < rawCode.length; i++) {
    const el = rawCode.charAt(i);
    const key = findKey(mapName, el);

    if (!key) cleanCode += el;
    else cleanCode += `&${key};`;
  }
  return cleanCode;
};

const updateOutputTextArea = (cleanCodeContent) => {
  outputTextArea.innerText = cleanCodeContent;
};

const updatePreview = (cleanCodeContent) => {
  if (cleanCodeContent) {
    previewArea.innerHTML = cleanCodeContent;
  } else {
    previewArea.innerHTML =
      '<p class="code-preview-initial-message">CODE PREVIEW AREA!</p>';
  }
  hljs.highlightBlock(previewArea);
};

const handleRawChange = () => {
  let cleanValue = getCleanCode(inputTextArea.value);
  updateOutputTextArea(cleanValue);
  updatePreview(cleanValue);
};

const handleCopyCode = () => {
  new ClipboardJS('button#copy-btn');
};
// TODO: Fix keyboard shortcut to copy!
const copyText = (e) => {};
const selectText = (e) => {
  e.focus();
  e.select();
};
const initializer = () => {
  hljs.initHighlightingOnLoad();
  inputTextArea.addEventListener('keypress', handleRawChange);
  inputTextArea.addEventListener('keydown', handleRawChange);
  inputTextArea.addEventListener('keyup', handleRawChange);
  convertBtn.addEventListener('click', handleRawChange);
  copyBtn.addEventListener('click', handleCopyCode);
};

initializer();
