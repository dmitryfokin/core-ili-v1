# core-ili-v1

## Реализация паттерна Item - Link - Item

## Реализовать API, получения данных. Универсальный навигатор по данным.

## Структура данных

### Item

Item - элемент или объект, в самом широком смысле. Каждый элемент имеет тип. Набор атрибутов. Набор атрибутов неограничен, но набор по умолчанию, определяется в типе элемента

### TypesItem

TypesItem - Типы элементов. Определяет:
* основные атрибуты элемента;
* основное правило формирования наименования элемента по атрибутам
* поведение элемента;
* типы связей в которых элемент может быть родителем, а в каких может быть потомком;
* условия уникальности;
* возможность хранения истории изменения
* возможность создания ревизий элементов



