angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, ConexionServ, $filter, $ionicPopup) {

  $scope.chats = ConexionServ.query('SELECT rowid, id, nombres, apellidos, Sexo, fecha_nac FROM profesores').then(function(result){
   $scope.chats = result;

});
  $scope.remove = function(profesor) {
   ConexionServ.query('DELETE FROM profesores WHERE rowid=?', [profesor.rowid]).then(function(result){

    console.log(result)

    $scope.chats = $filter('filter')($scope.chats , {rowid: '!' + profesor.rowid})
   $ionicPopup.show({template: 'Profesor eliminado', title:'Eliminado', buttons:[
          {
            text: '<b>Aceptar</b>',
            type: 'button-positive' ,
 
          }]

         });

      });
   };

  })

.controller('ChatDetailCtrl', function($scope, $state,  ConexionServ, $stateParams, $ionicPopup ) {
     ConexionServ.query('SELECT * FROM profesores WHERE rowid=?' , [$stateParams.profesor_rowid]).then(function(result, text){
        
      if(result.length >0) {
          $scope.profesor = result[0];
          console.log($scope.profesor);
      }else{
      $scope.no_hay = true;
   }
     }, function(res){
      console.log("No se pudo traer el Profesor",res);

     
      })

      $scope.actualizarProfesor = function(nombres, apellidos, Sexo, fecha_nac){
         datos = [nombres, apellidos, Sexo, fecha_nac, $stateParams.profesor_rowid];
         consulta = 'UPDATE profesores SET nombres=?, apellidos=?, Sexo=?, fecha_nac=? WHERE rowid=?';

         console.log(datos);
         

         

         ConexionServ.query(consulta, datos).then(function(result, txt){
          $ionicPopup.show({template: 'Guardado', title:'Guardado', buttons:[
          {
            text: '<b>Aceptar</b>',
            type: 'button-positive' ,

          }]

         });

            $state.go('tab.chats');
  

         }, function(res){
          console.log("no se pudo traer el Profesor", res);
         })

      }

        
})


.controller('ProfesorNuevoCtrl', function($scope, ConexionServ, $ionicPopup, $state ) {
  $scope.chats = {};

  $scope.crearProfesor = function(nombres, apellidos, Sexo, fecha_nac){
    consulta="INSERT INTO profesores(nombres, apellidos, Sexo,  fecha_nac) VALUES(?, ?, ?, ?)";
    datos = [ nombres, apellidos, Sexo, fecha_nac];
    ConexionServ.query(consulta, datos).then(function(result, txt){
          $ionicPopup.show({template: 'Profesor creado', title:'creado', buttons:[
          {
            text: '<b>Aceptar</b>',
            type: 'button-positive' ,

          }]

         });

            $state.go('tab.chats');
  

         }, function(res){
          console.log("no se pudo traer el Profesor", res);
         })



    }

})



.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
