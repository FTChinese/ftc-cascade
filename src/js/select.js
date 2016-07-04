const initialAttribute = 'data-initial';
const nextAttribute = 'data-next';

function Select(rootEl, data) {
	const oSelect = this;

	function init() {
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(el);
		}

		const initialSelectId = rootEl.getAttribute(initialAttribute);
		if (!initialSelectId) {
			return;
		}
		oSelect.rootEl = rootEl;
		oSelect.initialSelectId = initialSelectId;
		oSelect.initialSelectEl = document.getElementById(initialSelectId);
		render();
	}

	function render() {
		generateMenu(oSelect.initialSelectEl, data[oSelect.initialSelectId]);
		oSelect.rootEl.addEventListener('change', change)
	}

	
	function change(e) {
		const target = e.target;
		if (target.type === 'select-one') {
			const targetId = target.getAttribute(nextAttribute);
			if (targetId) {
				const targetEl = document.getElementById(targetId);
				generateMenu(targetEl, data[targetId], +target.value);
			}			
		}

	}

	function generateMenu(target, arr, parentId) {
		target.innerHTML = '';

		arr.forEach(function(item) {
			if (!item.parentId) {
				target.add(new Option(item.name, item.id), undefined);
			} else if (item.parentId === parentId) {
				target.add(new Option(item.name, item.id), undefined);
			}
		});
	}
	init();
}

export default Select;