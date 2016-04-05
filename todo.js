function Todo() {
    var that = this;

    this.init = function() {
        document.getElementById('add').addEventListener('click', todo.add);
        this.show();
    }

    this.get_todos = function() {
        var todos = [];
        var todos_str = localStorage.getItem('todo');
        if (todos_str !== null) {
            todos = JSON.parse(todos_str); 
        }
        return todos;
    };
    this.add = function() {
        var task = document.getElementById('task').value;
        if (!task) {
            return false;
        }

        var todos = that.get_todos();
        todos.push(task);
        localStorage.setItem('todo', JSON.stringify(todos));

        document.getElementById('task').value = '';
        that.show();
    };
    this.remove = function() {
        event.stopPropagation();

        var sure = confirm('Are you sure to remove?');
        if (!sure) {
            return false;
        }

        var id = this.parentElement.getAttribute('id');

        var todos = that.get_todos();
        todos.splice(id, 1);
        localStorage.setItem('todo', JSON.stringify(todos));

        that.show();
    };
    this.edit = function() {
        var id = this.getAttribute('id');
        var todos = that.get_todos();
        var newVal = prompt('Set new value:', todos[id]);
        if (!newVal) {
            return false;
        }
        todos[id] = newVal;
        localStorage.setItem('todo', JSON.stringify(todos));

        that.show();
    };
    this.show = function() {
        var todos = this.get_todos();

        var html = '<ol>';
        for(var i=0; i<todos.length; i++) {
            html += '<li id="' + i + '" class="edit clearfix"><button class="remove btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button>' +todos[i] + '</li>';
        };
        html += '</ol>';

        document.getElementById('todos').innerHTML = html;

        var buttons = document.getElementsByClassName('remove');
        for (var i=0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', this.remove);
        };
        var buttons = document.getElementsByClassName('edit');
        for (var i=0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', this.edit);
        };
    };
}

var todo = new Todo();
todo.init();