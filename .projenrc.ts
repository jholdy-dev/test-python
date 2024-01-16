import { typescript, python } from 'projen';
import { ReactTypeScriptProject } from 'projen/lib/web';
const project = new typescript.TypeScriptProject({
  authorName: 'Jholdy Damasceno',
  defaultReleaseBranch: 'main',
  name: 'test-verzel',
  projenrcTs: true,
  eslintOptions: { prettier: true, dirs: ['projects'] },
});

project.package.addField('prettier', {
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
  parent: project,
});

const frontend = new ReactTypeScriptProject({
  name: 'Frontend',
  authorName: 'Jholdy Damasceno',
  authorEmail: 'jholdydamasceno@gmail.com',
  outdir: './projects/frontend/app-code',
  defaultReleaseBranch: 'main',
  parent: project,
  eslintOptions: { prettier: true, dirs: ['projects/frontend'] },
});

frontend.package.addField('prettier', {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
});

project.synth();
