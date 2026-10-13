// 1. Переменные всех базовых типов

let num: number = 42;
let str: string = 'hello';
let bool: boolean = true;
let big: bigint = 9007199254740991n;
let sym: symbol = Symbol('id');
let nul: null = null;
let undef: undefined = undefined;

console.log('1:', num, str, bool, big, sym, nul, undef);

// 2. processValue(value: unknown)

function processValue(value: unknown): string | number {
  if (typeof value === 'string') {
    return value.toUpperCase();
  }
  if (typeof value === 'number') {
    return value * 2;
  }
  return 'неизвестный тип';
}

console.log('2:', processValue('abc'), processValue(21), processValue(true));

// 3. Массивы и sumMatrix

const cities: string[] = ['Москва', 'Петербург', 'Казань'];
const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const emptyNumbers: number[] = [];

function sumMatrix(m: number[][]): number {
  let sum = 0;
  for (const row of m) {
    for (const v of row) sum += v;
  }
  return sum;
}

console.log('3:', cities, matrix, emptyNumbers, sumMatrix(matrix));

// 4. Кортежи

type PersonTuple = [string, number, boolean];
type OptionalPersonTuple = [string, number, boolean?];

function describePerson(t: PersonTuple): string {
  const [name, age, status] = t;
  return `${name}, ${age} лет, ${status}`;
}

const p1: PersonTuple = ['Иван', 30, true];
const p2: OptionalPersonTuple = ['Мария', 25];

console.log('4:', describePerson(p1), p2);

// 5. Тип Book с readonly isbn

type Book = {
  title: string;
  author: string;
  year: number;
  readonly isbn: string;
  genre?: string;
};

const book: Book = {
  title: '1984',
  author: 'Оруэлл',
  year: 1949,
  isbn: '978-0-451-52493-5',
  genre: 'антиутопия',
};

console.log('5:', book);

// 6. createUser

function createUser(
  name: string,
  age: number,
  email?: string,
): { name: string; age: number; email: string } {
  return { name, age, email: email ?? 'не указан' };
}

console.log('6:', createUser('Иван', 30), createUser('Пётр', 22, 'p@e.ru'));

// 7. max(...nums)

function max(...nums: number[]): number {
  if (nums.length === 0) return -Infinity;
  let m = nums[0];
  for (const n of nums) if (n > m) m = n;
  return m;
}

console.log('7:', max(1, 5, 3), max(), max(-10, -3, -20));

// 8. Перегрузки format

function format(x: string): string;
function format(x: number): string;
function format(x: boolean): string;
function format(x: string | number | boolean): string {
  if (typeof x === 'string') return `"${x}"`;
  if (typeof x === 'number') return x.toFixed(2);
  return x ? 'да' : 'нет';
}

console.log('8:', format('hi'), format(3.14159), format(true), format(false));

// 9. ID = string | number

type ID = string | number;

function printId(id: ID): string {
  if (typeof id === 'string') return `Строковый ID: ${id}`;
  return `Числовой ID: ${id}`;
}

console.log('9:', printId('abc'), printId(123));

// 10. Пересечение типов

type HasName = { name: string };
type HasAge = { age: number };
type HasEmail = { email: string };

type Person = HasName & HasAge;
type FullPerson = Person & HasEmail;

const person: Person = { name: 'Иван', age: 30 };
const fullPerson: FullPerson = { name: 'Мария', age: 25, email: 'm@e.ru' };

console.log('10:', person, fullPerson);

// 11. Direction

type Direction = 'up' | 'down' | 'left' | 'right';

function move(dir: Direction): string {
  const map: Record<Direction, string> = {
    up: 'Движение вверх',
    down: 'Движение вниз',
    left: 'Движение влево',
    right: 'Движение вправо',
  };
  return map[dir];
}

console.log('11:', move('up'), move('left'));

// 12. interface Vehicle / Car

interface Vehicle {
  brand: string;
  year: number;
}

interface Car extends Vehicle {
  model: string;
  electric: boolean;
}

const car: Car = {
  brand: 'Tesla',
  year: 2024,
  model: 'Model 3',
  electric: true,
};

console.log('12:', car);

// 13. Слияние интерфейсов

interface Config {
  apiUrl: string;
}
interface Config {
  timeout: number;
}

const config: Config = { apiUrl: 'https://api.example.com', timeout: 5000 };
console.log('13:', config);

// 14. Point как interface и type

interface PointI {
  x: number;
  y: number;
}
type PointT = { x: number; y: number };

const pi: PointI = { x: 1, y: 2 };
const pt: PointT = { x: 3, y: 4 };

console.log('14:', pi, pt);

// 15. Класс BankAccount

class BankAccount {
  private balance: number;
  readonly owner: string;
  public accountNumber: string;
  static totalAccounts: number = 0;

  constructor(owner: string, accountNumber: string, initial: number = 0) {
    this.owner = owner;
    this.accountNumber = accountNumber;
    this.balance = initial;
    BankAccount.totalAccounts++;
  }

  deposit(amount: number): void {
    if (amount <= 0) throw new Error('Сумма должна быть > 0');
    this.balance += amount;
  }

  withdraw(amount: number): void {
    if (amount <= 0) throw new Error('Сумма должна быть > 0');
    if (amount > this.balance) throw new Error('Недостаточно средств');
    this.balance -= amount;
  }

  getBalance(): number {
    return this.balance;
  }
}

const acc1 = new BankAccount('Иван', 'ACC-001', 1000);
acc1.deposit(500);
acc1.withdraw(200);
const acc2 = new BankAccount('Мария', 'ACC-002');
console.log('15:', acc1.getBalance(), acc1.owner, BankAccount.totalAccounts);

// 16. Animal / Dog / Cat

class Animal {
  makeSound(): string {
    return '...';
  }
}
class Dog extends Animal {
  makeSound(): string {
    return 'Гав!';
  }
}
class Cat extends Animal {
  makeSound(): string {
    return 'Мяу!';
  }
}

const animals: Animal[] = [new Dog(), new Cat(), new Animal()];
console.log(
  '16:',
  animals.map((a) => a.makeSound()),
);

// 17. abstract Shape

abstract class Shape {
  abstract area(): number;
  describe(): string {
    return `Фигура с площадью ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(private r: number) {
    super();
  }
  area(): number {
    return Math.PI * this.r ** 2;
  }
}
class Rectangle extends Shape {
  constructor(
    private w: number,
    private h: number,
  ) {
    super();
  }
  area(): number {
    return this.w * this.h;
  }
}
class Triangle extends Shape {
  constructor(
    private base: number,
    private height: number,
  ) {
    super();
  }
  area(): number {
    return 0.5 * this.base * this.height;
  }
}

const shapes: Shape[] = [new Circle(2), new Rectangle(3, 4), new Triangle(5, 6)];
const totalArea = shapes.reduce((s, sh) => s + sh.area(), 0);
console.log('17:', totalArea.toFixed(2));
console.log(shapes.map((s) => s.describe()));

// 18. Serializable + Settings

interface Serializable {
  serialize(): string;
  deserialize(data: string): void;
}

class Settings implements Serializable {
  private data: Record<string, unknown> = {};

  set(key: string, value: unknown): void {
    this.data[key] = value;
  }
  get(key: string): unknown {
    return this.data[key];
  }

  serialize(): string {
    return JSON.stringify(this.data);
  }
  deserialize(data: string): void {
    this.data = JSON.parse(data) as Record<string, unknown>;
  }
}

const settings = new Settings();
settings.set('theme', 'dark');
settings.set('fontSize', 14);
const serialized = settings.serialize();
const settings2 = new Settings();
settings2.deserialize(serialized);
console.log('18:', serialized, settings2.get('theme'));

// 19. last<T>

function last<T>(arr: T[]): T | undefined {
  return arr.length ? arr[arr.length - 1] : undefined;
}

console.log(
  '19:',
  last<number>([1, 2, 3]),
  last<string>(['a', 'b']),
  last<{ id: number }>([{ id: 1 }, { id: 2 }]),
);

// 20. getProperty<T, K>

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// 23. Record + ReturnType

type Scores = Record<string, number>;
const scores: Scores = { Иван: 5, Мария: 4, Пётр: 3, Анна: 5 };
console.log('23:', scores);

function makeConfig() {
  return {
    host: 'localhost',
    port: 8080,
    debug: true,
  };
}
type AppConfig = ReturnType<typeof makeConfig>;
const appConfig: AppConfig = makeConfig();
console.log('23:', appConfig);

// 24. handle(res: Response)

type ApiResponse =
  | { status: 'success'; data: string[] }
  | { status: 'error'; message: string }
  | { status: 'loading' };

function handle(res: ApiResponse): string {
  switch (res.status) {
    case 'success':
      return `Успех: ${res.data.join(', ')}`;
    case 'error':
      return `Ошибка: ${res.message}`;
    case 'loading':
      return 'Загрузка...';
  }
}

console.log(
  '24:',
  handle({ status: 'success', data: ['a', 'b'] }),
  handle({ status: 'error', message: 'fail' }),
  handle({ status: 'loading' }),
);
