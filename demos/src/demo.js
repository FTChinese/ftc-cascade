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

const aSelect = {
	init: function(selectEl, nextEl) {
		this.currentEl = currentEl;
		this.value = 0;
		this.nextEl = nextEl
	},

	setValue: function(newValue) {
		if (this.value != newValue) {
			this.value = newValue;
		}
	}
};

const provinceEl = document.getElementById('province');
const nextEl = document.getElementById('city');

window.addEventListener('load', function() {
	console.log(provinceEl.value);

	for (var k in data) {
		console.log(k);
		provinceEl.add(new Option(k))
	}

});
provinceEl.addEventListener('change', function() {
	console.log(provinceEl.value);
});

