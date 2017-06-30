import * as uuid from 'uuid/v4';

export class IdObject {
  _id?: string;
  constructor(props?: Partial<IdObject>) {
    Object.assign(this, props);
  }
}

class DescribedObject extends IdObject {
  name: string;
  shortname: string; // used in uri. no spaces, lowercase
  description?: string;

  constructor(props?:Partial<DescribedObject>) {
    super(props);
  }
}

export class Project extends DescribedObject {
}

export class Folder extends DescribedObject {
  type: string; // like ComponentInstance, Component. also Folder by default
  folder: string = null;
  parent: string;

  constructor(props:Partial<Folder>) {
    super(props);
  }
}

export class Component extends DescribedObject {
  folder: string // [Folder.name.toLowerCase()]: (new Folder())._id
  components: string[] // []
}

export class ComponentInstance extends DescribedObject {
  component: string;
  folder: string;
}
