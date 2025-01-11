export interface TextInputModel
{
  value : string;
  placeholder : string;
  hasErrors : boolean;
  errorMessage : string;
}
export interface DdlModel extends TextInputModel
{

}

export interface DateInputModel extends TextInputModel
{
}