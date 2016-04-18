# Form 表单 #

- ngModel与Form表单
- 正确的数据回填姿势
- 通过name控制整个form表单的验证
- 更优雅的校验

## ngModel与Form表单 ##
**HTML**

	<form class="form-horizontal" name="formEdit" novalidate="novalidate">
        <div class="form-group" ng-class="getErrorClass(formEdit.ipv4).class">
            <label class="col-sm-2 control-label title" for="assets-ipv4"><i class="icon-required">*</i>ip地址：</label>
            <div class="col-sm-3">
                <input class="form-control" type="text" id="assets-ipv4" ng-model="asset.ipv4" name="ipv4" required ng-pattern="/^([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/"/>
            </div>
            <div class="col-sm-5">
            <span class="comments" ng-show="getErrorClass(formEdit.ipv4).class.length > 0">
                <span ng-show="showErrorMsg(formEdit.ipv4,'pattern');" >格式不正确</span>
                <span ng-show="showErrorMsg(formEdit.ipv4,'required');" >必填项</span>
            </span>
            </div>
        </div>
        <div class="form-group" ng-class="getErrorClass(formEdit.assetsAlias).class">
            <label class="col-sm-2 control-label title" for="assets-alias" >别名</label>
            <div class="col-sm-3">
                <input class="form-control" type="text" id="assets-alias" ng-model="asset.alias" name="assetsAlias" ng-maxlength="20"/>
            </div>
            <div class="col-sm-5">
            <span class="comments" ng-show="getErrorClass(formEdit.assetsAlias).class.length > 0">
                <span ng-show="showErrorMsg(formEdit.assetsAlias,'maxlength');" >长度不能超过20个字符</span>
            </span>
            </div>
        </div>

        <div class="form-group" ng-class="getErrorClass(formEdit.assetsPower).class">
            <label class="col-sm-2 control-label title" for="weight"><i class="icon-required">*</i>权重</label>
            <div class="col-sm-3">
                <select class="form-control form-select" ng-model="asset.weight" name="assetsPower" id="weight" required ng-options="weight.name for weight in weights track by weight.id">
                    <option value="" >-- 请选择 --</option>
                </select>
            </div>
            <div class="col-sm-5">
            <span class="comments" ng-show="getErrorClass(formEdit.assetsPower).class.length > 0">
                <span ng-show="showErrorMsg(formEdit.assetsPower, 'required');" >必填项，请选择</span>
            </span>
            </div>
        </div>
		<div class="form-group">
            <label class="col-sm-2 control-label title">ip类型</label>
            <div class="col-sm-3">
                <label><input type="radio" name="ipType" ng-model="asset.ipType" value="ipv4"/>IPv4</label>
                <label><input type="radio" name="ipType" ng-model="asset.ipType" value="ipv6"/>IPv6</label>
            </div>
            <div class="col-sm-5">
            </div>
        </div>

		<div class="form-group">
            <label class="col-sm-2 control-label title">消息通知方式</label>
            <div class="col-sm-3">
                <label><input type="checkbox" name="noticeWay" ng-model="asset.noticeWay[0]" ng-true-value="'sms'"/>短信</label>&emsp;
                <label><input type="checkbox" name="noticeWay" ng-model="asset.noticeWay[1]" ng-true-value="'email'"/>Email</label>&emsp;
                <label><input type="checkbox" name="noticeWay" ng-model="asset.noticeWay[2]" ng-true-value="'wychat'"/>微信</label>&emsp;
                <label><input type="checkbox" name="noticeWay" ng-model="asset.noticeWay[3]" ng-true-value="'sysMsg'" ng-disabled="true"/>系统消息</label>
            </div>
            <div class="col-sm-5">
            </div>
        </div>

        <p>{{asset}}</p>

        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <a class="btn btn-primary" ng-class="{true:'',false:'disabled'}[!formEdit.$pristine && formEdit.$valid]" ng-click="!formEdit.$pristine && formEdit.$valid && editSubmit();" >确定</a>
                <a class="btn btn-default" href="#/cancel" >取消</a>
            </div>
        </div>
    </form>

**JavaScript**
	
	//表单对象
	$scope.asset = {
        weight : {name:'中',id:'2',description:'means important.'},
        ipType: 'ipv4',
        noticeWay: [false,false,false,'sysMsg']
    };

	//ngOptions初始数据
    $scope.weights = [
        {name:'高',id:'1',description:'means very important.'}
        ,{name:'中',id:'2',description:'means important.'}
        ,{name:'低',id:'3',description:'means not important.'}
    ];

	//校验失败，返回error class
	//此处我们使用了bootstrap框架，form表单报错样式统一has-error类
    $scope.getErrorClass = function(inputName){
        this.class = "";
        if(inputName.$dirty && inputName.$invalid){
            this.class = "has-error";
        }
        return this;
    };
	//校验失败，控制相应的error类型显隐
    $scope.showErrorMsg = function(inputName, error){
        this.show = false;
        if(inputName.$dirty && inputName.$error[error]){
            this.show = true;
        }
        return this.show;
    };

	//响应表单提交事件
    $scope.editSubmit = function(){
        console.dir($scope.asset);
        alert("submit button was clicked!");
    };

> novalidate的作用是不启用浏览器自带的表单验证功能。 `H5新特性`

> 获取输入框内容采用ng-model，而不是取value属性值。ngModel不建议使用简单数据类型，建议使用对象来存储数据。$scope.asset = {};

> 表单校验使用scope对象的内置属性：$pristine,$dirty,$invalid,$valid,$error等，通过判断属性值就能完成校验。只需要两个function就可以实现。

> 本示例中使用了bootstrap框架，所以校验样式使用了bootstrap的has-error类。angular实际给表单元素添加了内置的class：ng-dirty，ng-invalid等，也可以通过自定义样式，实现表单校验样式统一。

> 得益于指令解析规则pre-link和post-link的逆向过程，我们可以通过formName监听整个表单验证状态，formEdit.$pristine && formEdit.$valid判断整个表单的校验状态，从而控制提交按钮状态。

## 正确的数据回填姿势 ##
**HTML**

	见上例select、input[type=radio]、input[type=text]

**JavaScript**

	$scope.asset = {
		//回填数据 或者 初始数据
        weight : {name:'中',id:'2',description:'means important.'},
        ipType: 'ipv4',
        noticeWay: [false,false,false,'sysMsg']
    };
   
> input[type="text"]回填数据只需要给ngModel赋值即可；
> 
> input[type=radio]回填数据需要使value和ngModel值相等；

> 通过ngOption创建的select，建议使用track by obj.id 指定适配规则，免去操作对象字段的计算量。如：weight.name for weight in weights track by weight.id。

> 需要理解清楚ngOption和ngRepeat中 `as` 和 `track by` 的区别。
>
	1. `as`类似起别名，建立一种映射关系，如 `A.id as B.name` 的意义是界面渲染用的B.name，实际ngModel拿到的是A.id。数据回填没用。
	2. `track by A.id` 是唯一标示，可以支持对象操作，对于数据对象回填非常方便，推荐使用。

> input[type=checkbox]比较特殊，需要通过ng-true-value="'sms'"和ng-false-value="false"指定值，数据回填需要设置ngModel和ngTrueValue全等`===`。特别注意，字符串要用引号引起来，否则angular无法识别是变量还是常量，编译就会报错。

## 更优雅的校验 ##
> scope提供了丰富的内置对象方法，如$setDirty,$setValidity等。可以将表单验证封装成指令，使用更方便。





