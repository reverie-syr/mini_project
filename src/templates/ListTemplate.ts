import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement; // unordered list element
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  static instance: ListTemplate = new ListTemplate();
  private constructor(
    private _ul: HTMLUListElement = document.getElementById(
      "listItems"
    ) as HTMLUListElement
  ) {}

  get ul(): HTMLUListElement {
    return this._ul;
  }

  clear(): void {
    this._ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    this.clear();
    fullList.list.forEach((listItem) => {
      const li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = listItem.id;
      check.checked = listItem.checked;
      li.append(check);

      check.addEventListener("change", () => {
        listItem.checked = !listItem.checked;
        fullList.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = listItem.id;
      label.textContent = listItem.item;
      li.append(label);

      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "X";
      li.append(button);
      button.addEventListener("click", () => {
        fullList.removeItem(listItem.id);
        this.render(fullList);
      });

      this._ul.append(li);
    });
  }
}
