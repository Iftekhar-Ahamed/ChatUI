export interface MenuConfigModel {
    key: string;
    name: string;
    basePath: string;
    pevPath: string | null;
    currentPath: string | null;
    isSelected: boolean;
    isViewInHeader: boolean;
}
