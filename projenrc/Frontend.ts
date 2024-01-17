import { IniFile, JsonFile } from 'projen';
import { TypescriptConfigOptions } from 'projen/lib/javascript';
import {
  TypeScriptAppProject,
  TypeScriptProjectOptions,
} from 'projen/lib/typescript';

interface FrontendTsConfig extends TypescriptConfigOptions {
  angularCompilerOptions: {
    enableI18nLegacyMessageIdFormat: boolean;
    strictInjectionParameters: boolean;
    strictInputAccessModifiers: boolean;
    strictTemplates: boolean;
  };
}

export class Frontend extends TypeScriptAppProject {
  constructor(options: TypeScriptProjectOptions) {
    super({
      ...options,
      deps: [
        '@angular/animations@^17.0.0',
        '@angular/common@^17.0.0',
        '@angular/compiler@^17.0.0',
        '@angular/core@^17.0.0',
        '@angular/forms@^17.0.0',
        '@angular/platform-browser@^17.0.0',
        '@angular/platform-browser-dynamic@^17.0.0',
        '@angular/router@^17.0.0',
        'rxjs@~7.8.0',
        'tslib@^2.3.0',
        'zone.js@~0.14.2',
      ],
      devDeps: [
        '@angular-devkit/build-angular@^17.0.10',
        '@angular/cli@^17.0.10',
        '@angular/compiler-cli@^17.0.0',
        '@types/jasmine@~5.1.0',
        'jasmine-core@~5.1.0',
        'karma@~6.4.0',
        'karma-chrome-launcher@~3.2.0',
        'karma-coverage@~2.2.0',
        'karma-jasmine@~5.1.0',
        'karma-jasmine-html-reporter@~2.1.0',
        'typescript@~5.2.2',
      ],
      typescriptVersion: '5.2.2',
      tsconfig: {
        compilerOptions: {
          outDir: './dist/out-tsc',
          forceConsistentCasingInFileNames: true,
          strict: true,
          noImplicitOverride: true,
          noPropertyAccessFromIndexSignature: true,
          noImplicitReturns: true,
          noFallthroughCasesInSwitch: true,
          skipLibCheck: true,
          esModuleInterop: true,
          sourceMap: true,
          declaration: false,
          experimentalDecorators: true,
          moduleResolution: 'node',
          importHelpers: true,
          target: 'ES2022',
          module: 'ES2022',
          useDefineForClassFields: false,
          lib: ['ES2022', 'dom'],
        },
        angularCompilerOptions: {
          enableI18nLegacyMessageIdFormat: false,
          strictInjectionParameters: true,
          strictInputAccessModifiers: true,
          strictTemplates: true,
        },
      } as FrontendTsConfig,
      jest: false,
      testdir: './src',
    });

    //this.tryRemoveFile('tsconfig.dev.json');

    this.addTask('ng', { exec: 'ng', receiveArgs: true });
    this.addTask('start', { exec: 'ng serve', receiveArgs: true });
    this.tasks.tryFind('compile')?.reset('ng build', { receiveArgs: true });
    this.addTask('ng:watch', {
      exec: 'ng build --watch --configuration development',
      receiveArgs: true,
    });
    this.tasks.tryFind('test')?.reset('ng test', { receiveArgs: true });
    this.addTask('e2e', { exec: 'ng e2e', receiveArgs: true });

    new IniFile(this, '.editorconfig', {
      obj: {
        root: true,
        '*': {
          charset: 'utf-8',
          indent_style: 'space',
          indent_size: 2,
          insert_final_newline: true,
          trim_trailing_whitespace: true,
        },
        '*.ts': {
          quote_type: 'single',
        },
        '*.md': {
          max_line_length: 'off',
          trim_trailing_whitespace: false,
        },
      },
    });

    this.gitignore.exclude('!.history/*');
    this.gitignore.exclude('/.angular/cache');
    this.gitignore.exclude('/.sass-cache/');
    this.gitignore.exclude('/connect.lock');
    this.gitignore.exclude('/coverage');
    this.gitignore.exclude('/libpeerconnection.log');
    this.gitignore.exclude('/testem.log');
    this.gitignore.exclude('/typings');
    this.gitignore.exclude('/.idea/');

    new JsonFile(this, 'tsconfig.app.json', {
      obj: {
        extends: './tsconfig.json',
        compilerOptions: {
          outDir: './out-tsc/app',
          types: [],
        },
        files: ['src/main.ts'],
        include: ['src/**/*.d.ts'],
      },
    });

    // create prettier config

    new JsonFile(this, '.prettierrc.json', {
      obj: {
        trailingComma: 'all',
        printWidth: 120,
        singleQuote: true,
        overrides: [],
      },
    });

    new JsonFile(this, 'tsconfig.spec.json', {
      obj: {
        extends: './tsconfig.json',
        compilerOptions: {
          outDir: './out-tsc/spec',
          types: ['jasmine'],
        },
        include: ['src/**/*.spec.ts', 'src/**/*.d.ts'],
      },
    });

    this.tsconfigDev.include.push('node_modules');

    new JsonFile(this, 'angular.json', {
      obj: {
        $schema: './node_modules/@angular/cli/lib/config/schema.json',
        version: 1,
        newProjectRoot: 'projects',
        projects: {
          'app-code': {
            projectType: 'application',
            schematics: {},
            root: '',
            sourceRoot: 'src',
            prefix: 'app',
            architect: {
              build: {
                builder: '@angular-devkit/build-angular:application',
                options: {
                  outputPath: 'dist/app-code',
                  index: 'src/index.html',
                  browser: 'src/main.ts',
                  polyfills: ['zone.js'],
                  tsConfig: 'tsconfig.app.json',
                  assets: ['src/favicon.ico', 'src/assets'],
                  styles: ['src/styles.css'],
                  scripts: [],
                },
                configurations: {
                  production: {
                    budgets: [
                      {
                        type: 'initial',
                        maximumWarning: '500kb',
                        maximumError: '1mb',
                      },
                      {
                        type: 'anyComponentStyle',
                        maximumWarning: '2kb',
                        maximumError: '4kb',
                      },
                    ],
                    outputHashing: 'all',
                  },
                  development: {
                    optimization: false,
                    extractLicenses: false,
                    sourceMap: true,
                  },
                },
                defaultConfiguration: 'production',
              },
              serve: {
                builder: '@angular-devkit/build-angular:dev-server',
                configurations: {
                  production: {
                    buildTarget: 'app-code:build:production',
                  },
                  development: {
                    buildTarget: 'app-code:build:development',
                  },
                },
                defaultConfiguration: 'development',
              },
              'extract-i18n': {
                builder: '@angular-devkit/build-angular:extract-i18n',
                options: {
                  buildTarget: 'app-code:build',
                },
              },
              test: {
                builder: '@angular-devkit/build-angular:karma',
                options: {
                  polyfills: ['zone.js', 'zone.js/testing'],
                  tsConfig: 'tsconfig.spec.json',
                  assets: ['src/favicon.ico', 'src/assets'],
                  styles: ['src/styles.css'],
                  scripts: [],
                },
              },
            },
          },
        },
      },
    });
  }
}
