// It creates an element with the given name and attributes and appends all further arguments it gets as child nodes, automatically converting strings to text nodes.
function createElement(name, attributes) {
	var node = document.createElement(name);
	if (attributes) {
		for (var attr in attributes) {
			if (attributes.hasOwnProperty(attr)) {
				node.setAttribute(attr, attributes[attr]);
			}
		}
	}

	for (var i = 2; i < arguments.length; i++) {
		var child = arguments[i];
		if (typeof child == 'string') {
			child = document.createTextNode(child);
		}
		node.appendChild(child);
	}
	return node;
}

const errorText = {
	'email': {
		'default': '邮箱格式错误',
		'empty': '邮箱不能为空',
		'taken': '该邮箱已注册'
	},
	'password': {
		'default': '只能包含英文和字母，6-20个字符',
		'empty': '密码不能为空'
	}
};

export {createElement, errorText};