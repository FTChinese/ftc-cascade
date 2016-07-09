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
	"河北": {
		"保定": ["保定金锎至臻汽车销售服务有限公司","保定极致汽车销售服务有限公司"],
		"唐山": ["唐山市冀东之星汽车销售服务有限公司", "唐山市庞大润星汽车销售服务有限公司"],
		"廊坊": ["廊坊利星行汽车销售服务有限公司", "三河波士智达汽车销售服务有限公司"],
		"承德": ["承德市庞大之星汽车销售服务有限公司"]
	},
	"山西": {
		"临汾": ["临汾之星汽车销售服务有限公司", ],
		"大同": ["山西必高之星汽车销售服务有限公司", ],
		"太原": ["太原利星汽车有限公司", "太原之星汽车销售服务有限公司"]
	}
}

class CascadeSelect  {
	constructor (current) {
		this.currentEl = current;
		// this.data = '';

		this.defaultValue = current.value;
		this.value = current.value;	

		// this.nextObj = nextObj;
		this.currentEl.addEventListener('change', (e) => {
			console.log('old value: ' + this.value)
			const newValue = e.target.value;
			this.setValue(newValue);
		});
	}

	setValue(newValue) {
		if (this.value != newValue) {
			this.value = newValue;

			if (this.nextObj) {
				this.removeOptions(this.nextObj.currentEl);	
// If current selectEl changed, then trigger change event on next selectEl, and so on, untile there is no next selectEl.			
				const ev = new Event('change', {"bubbles": true, "cancelable": true});
				this.nextObj.currentEl.dispatchEvent(ev);

				if (this.defaultValue != newValue) {
					const nextData = this.data[newValue];
					// pass data to next select.
					this.nextObj.data = nextData;

					this.addOptions(this.nextObj.currentEl, nextData);				
				} 
			}
		}
	}

	addOptions(targetEl, data) {
		if (Array.isArray(data)) {
			data.forEach(function(value) {
				targetEl.add(new Option(value));
			});
		} else {
			for (let k in data) {
				targetEl.add(new Option(k));
			}
		}
	}

	removeOptions(selectEl) {
		for (var i = selectEl.length; i > 1; i--) {
			selectEl.remove(i - 1)
		}
	}

	static init(rootEl, data) {
		const selectInstances = [];
		const selectEls = rootEl.querySelectorAll('select');

		for (let i = 0, len = selectEls.length; i < len; i++) {
			selectInstances.push(new CascadeSelect(selectEls[i]));
		}
// Establish a chain relation. The first object has a key pointint to the next item in the array.
		selectInstances.forEach(function(current, index, arr) {
			if (index === arr.length - 1) {
				current['nextObj'] = null
			} else {
				current['nextObj'] = arr[index + 1];
			}

			if (index === 0) {
				current['data'] = data;
				current.addOptions(current.currentEl, data);
			}
		});

		return selectInstances;
	}

};

const rootEl = document.querySelector('.o-cascade');

CascadeSelect.init(rootEl, data);


