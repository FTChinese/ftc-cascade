// const d = [
// 	{
// 		"id": 3, 
// 		"name": "河北",
// 		"children": [
// 			{

// 			}, {

// 			}, {

// 			}, {

// 			}
// 		]
// 	}, {
// 		"id": 4, 
// 		"name": "山西",
// 		"children": {

// 		}, {

// 		}, {

// 		}
// 	}
// ]

const data = {
	"北京": {
		"北京市":["东城区", "西城区", "朝阳区", "海淀区"]
	},
	"河北": {
		"唐山市": ["路北区", "路南区", "丰润区"],
		"邢台市": ["桥东区", "桥西区", "邢台县"]
	}
}
/*
congif = {
	itemEl: 'li',
	itemWrapper: 'geo-list' / [el, el, el]
}
*/


function createItems(template, arr) {
	return arr.map((content) => {
		return template.replace('{{content}}', content);
	});
}

class Stage {
	constructor (rootEl, config) {
		if (!rootEl) {
			return;
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		this.rootEl = rootEl;	
		this.template = config.template;
		this.tagName = config.tagName;

		this.selected = '';

// need to be set after the instance created.		
		this.nextStage = null;
		this.data = null;

		this.rootEl.addEventListener('click', (e) => {
			const target = e.target;

			if (target.nodeName.toLowerCase() === this.tagName) {

				this.setSelected(target.textContent);
				console.log('clicked on:', this.selected);
			}
		});

		this.rootEl.addEventListener('o.cascade', (e) => {
// e.detail could be object or null
			this.setData(e.detail);		
		});
	}

// Actions of setData and setSelected should both trigger dispatching custom event.
	setData(data) {
		this.data = data;
// if there are data, clear old items adn add news items, else just clear;
		if (this.data) {
			this.addItems();
		} else {
			this.clearItems();
		}	
		this.sendEvent();
	}
// everything revolves around this.selected.
// It is set only after an item is clicked.
	setSelected(newValue) {
		if (this.selected !== newValue) {
			this.selected = newValue;
			this.sendEvent();
		}

		if (!this.nextStage) {
			const completeEvent = new CustomEvent('o.complete', {
				'detail': 'complete',
				"bubbles": true, 
				"cancelable": true
			});
			console.log('Dispatching complete event');
			this.rootEl.dispatchEvent(completeEvent);			
		}
	}

	sendEvent() {
// If this.selected is not set but o.cascade is sent, then you cannot get data for detail.		
		if (this.nextStage) {
			const detail = this.selected ? this.data[this.selected] : null;
			const cascadeEvent = new CustomEvent('o.cascade', {
				'detail': detail,
				"bubbles": true, 
				"cancelable": true
			});
			console.log('dispatching custom event to next stage.', detail ? ' with data' : 'without data');
			console.log('this.selected: ', this.selected);
			this.nextStage.rootEl.dispatchEvent(cascadeEvent);
		}
	}

	addItems() {
// clear innerHTML before adding
		this.clearItems();
		const items = Array.isArray(this.data) ? this.data : Object.keys(this.data)

		const itemEls = createItems(this.template, items);

		this.rootEl.innerHTML = itemEls.join('');
	}

	clearItems() {
		this.rootEl.innerHTML = '';
		this.setSelected('');
	}
}

class Cascade {
	constructor(container, config) {
		if (!container) {
			return;
		} else if (!(container instanceof HTMLElement)) {
			container = document.querySelector(container);
		}

		const stages = [];

		const stageEls = container.querySelectorAll(config.stage);

		for (let i = 0; i < stageEls.length; i++) {
			stages.push(new Stage(stageEls[i], {
				template: config.template,
				tagName: config.tagName
			}));
		}
		

		for (let i = 0; i < stages.length - 1; i++) {
			stages[i].nextStage = stages[i + 1];
		}

		// initialize first tab
		stages[0].setData(config.data);

		this.stages = stages;
		this.history = [];

		container.addEventListener('o.complete', (e) => {
			console.log('complete event received');
		});
	}
}

const cascade = new Cascade('.geo', {
	stage: '.geo-list',
	template: '<li>{{content}}</li>',
	tagName: 'li',
	data: data
});

console.log(cascade)

// class CascadeSelect  {
// 	constructor (rootEl) {
// 		if (!rootEl) {
// 			return;
// 		} else if (!(rootEl instanceof HTMLElement)) {
// 			rootEl = document.querySelector(rootEl);
// 		}
// 		this.rootEl = rootEl;
// 		// this.data = '';

// 		this.defaultValue = this.rootEl.value;
// 		this.value = rootEl.value;	

// 		// this.nextObj = nextObj;
// 		this.rootEl.addEventListener('change', (e) => {
// 			console.log('old value: ' + this.value)
// 			const newValue = e.target.value;
// 			this.setValue(newValue);
// 		});
// 	}

// 	setValue(newValue) {
// 		if (this.value != newValue) {
// 			this.value = newValue;

// 			if (this.nextObj) {
// //let nextInstance remove its options				
// 				this.removeOptions(this.nextObj.rootEl);	
// // If current selectEl changed, then trigger change event on next selectEl, and so on, untile there is no next selectEl.			
// 				const ev = new Event('change', {"bubbles": true, "cancelable": true});
// 				this.nextObj.rootEl.dispatchEvent(ev);

// 				if (this.defaultValue != newValue) {
// 					const nextData = this.data[newValue];
// 					// pass data to next select.
// 					this.nextObj.data = nextData;

// 					this.addOptions(this.nextObj.rootEl, nextData);				
// 				} 
// 			}
// 		}
// 	}

// 	addOptions(targetEl, data) {
// 		if (Array.isArray(data)) {
// 			data.forEach(function(value) {
// 				targetEl.add(new Option(value));
// 			});
// 		} else {
// 			for (let k in data) {
// 				targetEl.add(new Option(k));
// 			}
// 		}
// 	}

// 	removeOptions(selectEl) {
// 		for (var i = selectEl.length; i > 1; i--) {
// 			selectEl.remove(i - 1)
// 		}
// 	}

// 	static init(rootEl, data) {
// 		const selectInstances = [];
// 		const selectEls = rootEl.querySelectorAll('select');

// 		for (let i = 0, len = selectEls.length; i < len; i++) {
// 			selectInstances.push(new CascadeSelect(selectEls[i]));
// 		}
// // Establish a chain relation. The first object has a key pointint to the next item in the array.
// 		selectInstances.forEach(function(current, index, arr) {
// 			if (index === arr.length - 1) {
// 				current['nextObj'] = null
// 			} else {
// 				current['nextObj'] = arr[index + 1];
// 			}

// 			if (index === 0) {
// 				current['data'] = data;
// 				current.addOptions(current.currentEl, data);
// 			}
// 		});

// 		return selectInstances;
// 	}

// };

// const rootEl = document.querySelector('.o-cascade');

// CascadeSelect.init(rootEl, data);


