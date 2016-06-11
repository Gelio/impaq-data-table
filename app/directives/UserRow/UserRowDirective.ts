import {User, IUserView} from '../../User';

function UserRowController(scope) {
    let backup;

    scope.createBackup = () => {
        backup = JSON.parse(JSON.stringify(scope.user));
        backup.edited = false;  // When we revert to the backup we don't want to edit anymore
    };

    scope.cancelEdit = () => {
        // Copy the element back
        for (let key in backup)
            if (backup.hasOwnProperty(key))
                scope.user[key] = backup[key];
    };

    scope.$watch('user.edited', (value) => {
        if (value === true)
            scope.createBackup();
        else
            scope.cancelEdit();
    });
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
