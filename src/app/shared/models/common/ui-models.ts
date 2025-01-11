export interface TextInputModel
{
  value : string;
  placeholder : string;
  hasErrors : boolean;
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
  hasErrors : boolean;
}

export interface DateInputModel extends TextInputModel
{
}