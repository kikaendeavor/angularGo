# Form 表单 #

- ngModel与Form表单
- 正确的数据回填姿势
- 通过name控制整个form表单的验证
- 更优雅的校验

## ngModel与Form表单 ##
**HTML**

	<form name="myForm" novalidate="novalidate">
		div.
    	<input name="name" type="text" ng-model="userInfo.name" required/>
		<span ng-show="myForm.name.$error.required">name is required.</span>
		<button type="button" class="btn btn-default" ng-class="{true:disabled}[myForm.$error.$invalid]" ng-click="myForm.$error.$valid && submit();"><button>
	</form>`

**JavaScript**
	
	$scope.userInfo = {};	//声明一个空对象，用来绑定form表单数据

> novalidate的作用是不启用浏览器自带的表单验证功能。 `H5新特性`

> 获取输入框内容采用ng-model，而不是取value属性值。

> 通过