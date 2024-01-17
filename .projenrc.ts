import { typescript, python } from 'projen';
import { Frontend } from './projenrc/Frontend';

const root = new typescript.TypeScriptProject({
  authorName: 'Jholdy Damasceno',
  defaultReleaseBranch: 'main',
  name: 'test-verzel',
  projenrcTs: true,
  eslintOptions: { prettier: true, dirs: ['projects'] },
});

root.package.addField('prettier', {
  singleQuote: true,
  semi: true,
  trailingComma: 'es5',
});

new python.PythonProject({
  name: 'Backend',
  moduleName: 'backend',
  authorName: 'Jholdy Damasceno',
  authorEmail: 'jholdydamasceno@gmail.com',
  version: '1.0.0',
  outdir: './projects/backend/app-code',
  parent: root,
});

new Frontend({
  name: 'Frontend',
  outdir: './projects/frontend/app-code',
  parent: root,
  defaultReleaseBranch: 'main',
  authorName: 'Jholdy Damasceno',
  authorEmail: 'jholdydamasceno@gmail.com',
});

root.synth();
