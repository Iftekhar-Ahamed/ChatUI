export interface TextInputModel
{
  value : string;
  placeholder : string;
  hasErrors : boolean;
  isEditable : boolean;
  errorMessage : string;
}

export interface  DdlDataModel{
  value : string;
  key : string;
}
export interface DdlModel
{
  data : DdlDataModel[];
  selectedData : DdlDataModel;
  isEditable : boolean;
  hasErrors : boolean;
}

export interface DateInputModel extends TextInputModel
{
}