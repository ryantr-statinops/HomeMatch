package main

import (
	"strings"
	"testing"
)

func TestFixture(t *testing.T) {
	valid := `{"schema_version":"1","is_synthetic":true,"source_id":"fixture-only","articles":[{"id":"a"}]}`
	f, err := parseFixture(strings.NewReader(valid))
	if err != nil || len(f.Articles) != 1 {
		t.Fatal("valid fixture rejected")
	}
	for _, bad := range []string{`{`, strings.Replace(valid, `true`, `false`, 1), strings.Replace(valid, `fixture-only`, `live`, 1), strings.Replace(valid, `[{"id":"a"}]`, `[{"id":"a"},{"id":"a"}]`, 1), valid + ` {}`, `{"schema_version":"1","is_synthetic":true,"source_id":"fixture-only"}`} {
		if _, err := parseFixture(strings.NewReader(bad)); err == nil {
			t.Error("invalid fixture accepted")
		}
	}
}
