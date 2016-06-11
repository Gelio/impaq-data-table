import {User, IUserView} from '../../User';

function UserRowController(scope, element, attrs) {
    let backup;

    scope.beginEdit = () => {
        backup = JSON.parse(JSON.stringify(scope.user));
        scope.user.edited = true;
    };

    scope.cancelEdit = () => {
        // Copy the element back
        for (let key in backup)
            if (backup.hasOwnProperty(key))
                scope.user[key] = backup[key];
    };
}

function UserRowDirective() {
    return {
        link: UserRowController,
        replace: true,
        restrict: 'A',
        scope: {
            remove: '&',
            save: '&',
            user: '='
        },
        template: require('html!./UserRowTemplate.html')
    };
}

export default angular.module('UserRowModule', [])
    .directive('userRow', UserRowDirective);

