import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { OPENAI_API_KEY } from 'src/environment';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-code-review',
  templateUrl: `./code-review.component.html`
})
export class CodeReviewComponent {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  selectedFile?: File;
  reviewResult?: string;
  isLoading = false;
  constructor(private http: HttpClient) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async reviewCode() {
    this.isLoading = true;
    if (!this.selectedFile) {
      this.isLoading = false;
      alert('Please select a file first!');
      return;
    }
   
    const fileReader = new FileReader();
    fileReader.onload = async (e:any) => {
      const tsCode = e.target.result as string;
      const { Configuration, OpenAIApi } = require("openai");
      const configuration = new Configuration({
        apiKey: OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
          
      const prompt = 'Please review my Angular code:';
      const options = {
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.5,
        // n: 1,
        // stop: ['\n']
      };
      options.prompt += `\n\n${tsCode}`;
      
      const completion = await openai.createCompletion(options);
   
      this.reviewResult = completion.data.choices[0].text;
      this.isLoading = false;
    };
    fileReader.readAsText(this.selectedFile);
  }
}
