angular.module('gdansk-training', [
    'gt.components.bookmark-app',
    'gt.components.add-bookmark-form',
    'gt.components.bookmark-list',
    'gt.components.bookmark-tags',
    'mongolab-factory',
    'gdanskTraining.templates',
    'gdanskTraining-constant'
]).config(function (mongolabFactoryProvider) {
    mongolabFactoryProvider.setConfigs({
        dataBase: 'bookmarks-app',
        apiKey: 'Xdh27t0ATpYntQE8kxQcvIkLZzPaOb6Z'
    });
}).run(function ( $log, gdanskTrainingVersion, $rootScope ) {
    $rootScope.field1 = 'root';
    if ( !gdanskTrainingVersion ) { return; }
    $log.info('app version: ' + gdanskTrainingVersion);
}).directive('gdanskTraining', function () {
    return { templateUrl: 'app/app.module.html' };
});

angular.module('gdanskTraining.templates', []);

try {
    angular.module('gdanskTraining-constant');
} catch ( error ) {
    angular.module('gdanskTraining-constant', []).constant('gdanskTrainingVersion', null);
}
