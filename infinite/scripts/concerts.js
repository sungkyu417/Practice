/**
 * Created by Administrator on 2016/5/4.
 */
var app=angular.module('myApp',[]);
app.controller('liveCtrl',function($scope){
    $scope.lives=[
        {date:'2015-9-30',country:'Nanjing'},
        {date:'2015-11-10',country:'Beijing'},
        {date:'2015-12-01',country:'New York'}
    ];
});