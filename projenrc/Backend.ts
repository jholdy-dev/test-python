import { PythonProject, PythonProjectOptions } from 'projen/lib/python';

export class Backend extends PythonProject {
  constructor(options: PythonProjectOptions) {
    super({
      ...options,
      deps: [
        'flask',
        'flask_sqlalchemy',
        'flask_migrate',
        'sqlalchemy_serializer',
        'dynaconf',
        'flask-restful',
        'flask-restful',
      ],
      pytest: false,
    });

    const env = {
      FLASK_APP: 'backend.app:create_app',
    };

    this.addTask('start', {
      env,
      exec: 'flask run --debugger --reload',
    });

    this.addTask('init:config', {
      env,
      exec: 'dynaconf init -f toml',
    });

    this.addTask('init:migrate', {
      env,
      exec: 'flask db init',
    });

    this.addTask('migrate', {
      env,
      exec: 'flask db migrate',
    });

    this.addTask('create:db', {
      env,
      exec: 'flask createdb',
    });

    this.addTask('drop:db', {
      env,
      exec: 'flask dropdb',
    });

    this.addTask('populate:db', {
      env,
      exec: 'flask populatedb',
    });

    this.addTask('flask:help', {
      env,
      exec: 'flask --help',
    });

    this.gitignore.exclude('.secrets.*');
  }
}
