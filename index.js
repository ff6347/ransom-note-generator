const fonts = [
	'Arial',
	'Courier New',
	'Georgia',
	'Times New Roman',
	'Verdana',
	'Impact',
	'Comic Sans MS',
	'Trebuchet MS',
	'Lucida Console',
	'Palatino',
	'Garamond',
	'Tahoma',
	'Geneva',
	'Monaco',
	'Brush Script MT',
];
const colors = ['#111'];
const bgs = ['#fff'];
const weights = ['normal', 'bold', 'bolder', 'lighter', 700, 900];
function random(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
function randomAngle() {
	return `${(Math.random() - 0.5) * 30}deg`;
}
function randomSize() {
	return `${1 + Math.random() * 0.7}em`;
}
document.getElementById('generate').onclick = function () {
	const text = document.getElementById('input').value;
	const output = document.getElementById('output');
	if (text === '') {
		output.innerHTML = '';
		return;
	}
	output.innerHTML = '';
	const lines = text.split('\n');
	lines.forEach((line) => {
		const lineDiv = document.createElement('div');
		lineDiv.style.display = 'block';
		lineDiv.style.width = '100%';
		lineDiv.style.margin = '0';
		const words = line.split(/(\s+)/);
		words.forEach((word) => {
			if (/^\s+$/.test(word)) {
				lineDiv.appendChild(document.createTextNode(word));
				return;
			}
			if (word.length === 0) return;
			let r = Math.random();
			let mode;
			if (word.length < 3) {
				mode = 2;
			} else if (r < 0.7) {
				mode = 0;
			} else if (r < 0.98) {
				mode = 1;
			} else {
				mode = 2;
			}
			if (mode === 0) {
				const span = document.createElement('span');
				span.className = 'ransom-char';
				span.style.setProperty('--font', random(fonts));
				span.style.setProperty('--color', random(colors));
				span.style.setProperty('--bg', random(bgs));
				span.style.setProperty('--weight', random(weights));
				span.style.setProperty('--angle', randomAngle());
				span.style.setProperty('--size', randomSize());
				span.textContent = word;
				lineDiv.appendChild(span);
			} else if (mode === 1 && word.length > 2) {
				let parts = [];
				let i = 0;
				while (i < word.length) {
					let remain = word.length - i;
					let len =
						remain <= 2
							? remain
							: 1 + Math.floor(Math.random() * Math.min(3, remain));
					parts.push(word.slice(i, i + len));
					i += len;
				}
				parts.forEach((part) => {
					const span = document.createElement('span');
					span.className = 'ransom-char';
					span.style.setProperty('--font', random(fonts));
					span.style.setProperty('--color', random(colors));
					span.style.setProperty('--bg', random(bgs));
					span.style.setProperty('--weight', random(weights));
					span.style.setProperty('--angle', randomAngle());
					span.style.setProperty('--size', randomSize());
					span.textContent = part;
					lineDiv.appendChild(span);
				});
			} else {
				for (let char of word) {
					const span = document.createElement('span');
					span.className = 'ransom-char';
					span.style.setProperty('--font', random(fonts));
					span.style.setProperty('--color', random(colors));
					span.style.setProperty('--bg', random(bgs));
					span.style.setProperty('--weight', random(weights));
					span.style.setProperty('--angle', randomAngle());
					span.style.setProperty('--size', randomSize());
					span.textContent = char;
					lineDiv.appendChild(span);
				}
			}
		});
		output.appendChild(lineDiv);
	});
};
document.getElementById('print').onclick = function () {
	window.print();
};
