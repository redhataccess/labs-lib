/*global window, chrometwo_require lib */
(function () {
    chrometwo_require(['lib/example/main', 'lib/example_two/main'], function (example, example_two) {
        console.log('Hi from requirejs-demo.js');

        console.log(example);
        example.sayHello();
        console.log(example.getMagicNumber());


        console.log('Calling example_two');
        example_two.sayHello();
    });
}());