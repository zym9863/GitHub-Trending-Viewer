export interface LanguageOption {
  name: string;
  urlParam: string;
}

export const languages: LanguageOption[] = [
  { name: 'All Languages', urlParam: '' },
  { name: 'C', urlParam: 'c' },
  { name: 'C#', urlParam: 'c%23' },
  { name: 'C++', urlParam: 'c++' },
  { name: 'CSS', urlParam: 'css' },
  { name: 'Dart', urlParam: 'dart' },
  { name: 'Elixir', urlParam: 'elixir' },
  { name: 'Go', urlParam: 'go' },
  { name: 'Haskell', urlParam: 'haskell' },
  { name: 'HTML', urlParam: 'html' },
  { name: 'Java', urlParam: 'java' },
  { name: 'JavaScript', urlParam: 'javascript' },
  { name: 'Jupyter Notebook', urlParam: 'jupyter-notebook' },
  { name: 'Kotlin', urlParam: 'kotlin' },
  { name: 'Lua', urlParam: 'lua' },
  { name: 'Objective-C', urlParam: 'objective-c' },
  { name: 'Perl', urlParam: 'perl' },
  { name: 'PHP', urlParam: 'php' },
  { name: 'Python', urlParam: 'python' },
  { name: 'R', urlParam: 'r' },
  { name: 'Ruby', urlParam: 'ruby' },
  { name: 'Rust', urlParam: 'rust' },
  { name: 'Scala', urlParam: 'scala' },
  { name: 'Shell', urlParam: 'shell' },
  { name: 'Swift', urlParam: 'swift' },
  { name: 'TypeScript', urlParam: 'typescript' },
  { name: 'Vue', urlParam: 'vue' },
  { name: 'Zig', urlParam: 'zig' },
];
