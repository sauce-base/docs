declare module '@docusaurus/plugin-content-docs' {
  export interface PropSidebarItemCategory {
    customProps?: {
      icon?: string;
      [key: string]: unknown;
    };
  }

  export interface PropSidebarItemLink {
    customProps?: {
      icon?: string;
      [key: string]: unknown;
    };
  }
}
