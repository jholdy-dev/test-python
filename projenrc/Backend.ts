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

    this.addTask('start', {
      exec: 'python -m backend',
    });

    this.addTask('init:config', {
      exec: 'dynaconf init -f toml',
    });

    this.gitignore.exclude('.secrets.*');
  }
}
