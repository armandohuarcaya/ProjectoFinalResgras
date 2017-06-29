app
// =========================================================================
// Show View and Delete Autor
// =========================================================================
    .controller("ReservaCtrl", function($scope, $timeout, $state, $stateParams, reservaService, $window, $mdDialog, $log, toastr, $filter) {
        //Valores iniciales
        $scope.fields = 'razon_social';
        var params = {};
        $scope.lista = [];
        $scope.listaevent = [];
        $scope.empresa = {};
        $scope.gui = [
            {a:"41.0",
             b:"50.0", 
             c:"9.0"},
            {a:"50.0",
             b:"26.0", 
             c:"50.0"}
            ];

        var values = {name: 'misko', gender: 'male'};
        var log = [];
        angular.forEach(values, function(value, key) {
          this.push(key + ': ' + value);
        }, log);

        $scope.list = function(params) {
            console.log("=========================");
            $scope.isLoading = true;
            reservaService.Reserva.query(params, function(r) {
                console.log("==========================="+r.results)
                $scope.lista = r.results;
                
                angular.forEach($scope.lista , function(v) {
                  var a = {};
                  
                  a["title"] = "Ocupado"+v;
                  a["start"] = new Date(v.fecha_inicio);
                  a["end"] = new Date(v.fecha_fin);
                  a["allDay"] = false
                  $scope.listaevent.push(a);
                });
                console.log($scope.listaevent);
                $scope.options = r.options;
                $scope.isLoading = false;
            }, function(err) {
                $log.log("==================Error in list:" + JSON.stringify(err));
                toastr.error(err.data.results.detail, err.status + ' ' + err.statusText);
            });
        };
        $scope.list(params);

        $scope.buscar = function() {
            params.page = 1;
            params.fields = $scope.fields;
            params.query = $scope.query;
            $scope.list(params);
        };

        $scope.onReorder = function(order) { //TODO
            $log.log('Order: ' + order);
        };

        $scope.delete = function(d) {
            if ($window.confirm("Seguro?")) {
                creservaService.Reserva.delete({ id: d.id }, function(r) {
                    $log.log("Se eliminó Categoria Sector:" + JSON.stringify(d));
                    toastr.success('Se eliminó Consejo ' + d.cat_sect_nombre , 'Categoria Sector');
                    $scope.list(params);
                }, function(err) {
                    $log.log("Error in delete:" + JSON.stringify(err));
                    toastr.error(err.data.detail, err.status + ' ' + err.statusText);
                });
            }
        };
        $scope.dater = new Date("2017-06-25T22:02:32.049999Z");

    function getDate(offsetDays, hour) {
            offsetDays = offsetDays || 0;
            var offset = offsetDays * 24 * 60 * 60 * 1000;
            var date = new Date(new Date().getTime() + offset);
            if (hour) { date.setHours(hour); }
            return date;
          }

        $scope.events = [
        {
          title: 'Ocupado',
          start: new Date(),
          end: new Date(),
          allDay: false
        }
      ];
      $scope.selected = $scope.listaevent[0];

      $scope.eventClicked = function (item) {
        console.log(item);
      };

      $scope.createClicked = function (date) {
        console.log(date);
        console.log("creando aqui");
        window.location.href="http://127.0.0.1:8000/reserva/reserva-filter/";
        //$state.go('catalogo.catalogo.url');
      };

      $scope.dis = false;

    })