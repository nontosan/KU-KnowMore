import { IsNotEmpty } from "class-validator";

export class CreateReportDto {
    @IsNotEmpty()
    user_id: string;

    content_id?: string;

    content_type?: string;

    report_string?: string;

    @IsNotEmpty()
    report_reason?: string;

    date_time?: string;
}