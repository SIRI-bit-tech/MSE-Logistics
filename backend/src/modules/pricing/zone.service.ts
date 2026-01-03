import { Injectable } from "@nestjs/common"

@Injectable()
export class ZoneService {
  async getZoneSurcharge(senderZip: string, recipientZip: string): Promise<number> {
    // Simplified zone calculation - just return 0 for now
    return 0
  }
}
